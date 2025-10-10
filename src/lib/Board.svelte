
<script lang="ts">
  import { onMount, createEventDispatcher, tick } from 'svelte';
  import Matter from 'matter-js';
  import { setupEngine, addBoundaries } from './engine';
  import { addNumber, removeNumber, target } from './stores';
  import { get } from 'svelte/store';

  const dispatch = createEventDispatcher();

  let container: HTMLElement;
  let world: Matter.World;
  let engine: Matter.Engine;
  let baskets: Matter.Body[] = [];
  let boardWidth: number;
  let boardHeight: number;

  // Mapas para rastrear los cubos y las "soldaduras" (constraints) a cada cesta
  let stuckCubes = new Map<number, Matter.Body>();
  let stuckConstraints = new Map<number, Matter.Constraint>();

  onMount(() => {
    const { engine: eng, world: wrld, mouseConstraint } = setupEngine(container);
    engine = eng;
    world = wrld;
    boardWidth = container.clientWidth;
    boardHeight = 600;
    addBoundaries(world, boardWidth, boardHeight);

    let draggedBody: Matter.Body | null = null;

    Matter.Events.on(mouseConstraint, 'startdrag', (event) => {
        draggedBody = event.body;
        if (!draggedBody) return;

        // Si el cubo está "soldado", rompemos la soldadura
        const constraint = stuckConstraints.get(draggedBody.id);
        if (constraint) {
            Matter.World.remove(world, constraint);
            stuckConstraints.delete(draggedBody.id);

            // Buscamos a qué cesta estaba unido para actualizar el estado
            stuckCubes.forEach((cubeBody, basketId) => {
                if (cubeBody.id === draggedBody.id) {
                    stuckCubes.delete(basketId);
                    dispatch('basketupdate', { basketId, count: 0 });
                }
            });
        }

        if ((draggedBody as any).element) {
            (draggedBody as any).element.style.zIndex = '100';
        }
    });

    Matter.Events.on(mouseConstraint, 'enddrag', async (event) => {
        if (!draggedBody) return;
        if ((draggedBody as any).element) {
            (draggedBody as any).element.style.zIndex = '1';
        }
        await handleDrop(draggedBody);
        draggedBody = null;
    });

    dispatch('boardready', { world, width: boardWidth, height: boardHeight });
  });

  async function handleDrop(droppedBody: Matter.Body) {
    await tick();

    for (const basket of baskets) {
        if (Matter.Bounds.contains(basket.bounds, droppedBody.position)) {
            const existingStuckCube = stuckCubes.get(basket.id);

            if (existingStuckCube) {
                // --- LÓGICA DE OPERACIÓN (SEGUNDO CUBO) ---
                const valA = (existingStuckCube as any).cubeValue as number;
                const valB = (droppedBody as any).cubeValue as number;
                let result: number | null = null;

                switch ((basket as any).operation) {
                    case 'add': result = valA + valB; break;
                    case 'subtract': result = Math.max(valA, valB) - Math.min(valA, valB); break;
                    case 'multiply': result = valA * valB; break;
                    case 'divide':
                        const higher = Math.max(valA, valB);
                        const lower = Math.min(valA, valB);
                        if (lower !== 0 && higher % lower === 0) result = higher / lower;
                        break;
                }

                if (result !== null) {
                    const constraint = stuckConstraints.get(existingStuckCube.id);
                    if(constraint) Matter.World.remove(world, constraint);

                    removeNumber((existingStuckCube as any).cubeId);
                    removeNumber((droppedBody as any).cubeId);
                    stuckCubes.delete(basket.id);
                    stuckConstraints.delete(existingStuckCube.id);
                    dispatch('basketupdate', { basketId: basket.id, count: 0 });

                    if (result === get(target)) dispatch('victory');
                    
                    addNumber(result, basket.position.x, basket.position.y - 40);
                }

            } else {
                // --- LÓGICA DE "SOLDAR" (PRIMER CUBO) ---
                Matter.Body.setVelocity(droppedBody, { x: 0, y: 0 });
                Matter.Body.setAngularVelocity(droppedBody, 0);
                Matter.Body.setPosition(droppedBody, { x: basket.position.x, y: basket.position.y });

                const constraint = Matter.Constraint.create({
                    bodyA: droppedBody,
                    bodyB: basket,
                    stiffness: 1,
                    length: 0
                });

                Matter.World.add(world, constraint);
                stuckCubes.set(basket.id, droppedBody);
                stuckConstraints.set(droppedBody.id, constraint);
                dispatch('basketupdate', { basketId: basket.id, count: 1 });
            }
            return;
        }
    }
  }

  function handleBasketCreated(event: CustomEvent<{ body: Matter.Body }>) {
      baskets.push(event.detail.body);
      Matter.World.add(world, event.detail.body);
  }

</script>

<div class="board-container" bind:this={container} on:basketcreated={handleBasketCreated}>
  <slot></slot>
</div>

<style>
  .board-container {
    width: 90vw;
    max-width: 800px;
    height: 600px;
    background-color: #fdf6e3;
    border: 8px solid #a0522d;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    touch-action: none;
  }
</style>
