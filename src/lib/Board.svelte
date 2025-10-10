
<script lang="ts">
  import { onMount, createEventDispatcher, tick } from 'svelte';
  import Matter from 'matter-js';
  import { setupEngine, addBoundaries } from './engine';
  import { addNumber, removeNumber } from './stores';

  const dispatch = createEventDispatcher();

  let container: HTMLElement;
  let world: Matter.World;
  let engine: Matter.Engine;
  let baskets: Matter.Body[] = [];
  let boardWidth: number;
  let boardHeight: number;

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
        if (draggedBody && (draggedBody as any).element) {
            (draggedBody as any).element.style.zIndex = '100'; // Poner al frente al arrastrar
        }
    });

    Matter.Events.on(mouseConstraint, 'enddrag', (event) => {
        if (draggedBody && (draggedBody as any).element) {
            (draggedBody as any).element.style.zIndex = '1'; // Restaurar z-index
        }
        draggedBody = null;
        
        // ¡AQUÍ ESTÁ LA CORRECCIÓN! La comprobación solo se hace al soltar el cubo.
        checkAllBaskets(); 
    });

    Matter.Events.on(engine, 'beforeUpdate', () => {
      // Lógica de contención del arrastre para que el cubo no se salga de los bordes
      if (draggedBody) {
        const limit = 5; // Límite pequeño para evitar que se "pegue" al borde
        if (draggedBody.position.x < limit) {
          Matter.Body.setPosition(draggedBody, { x: limit, y: draggedBody.position.y });
        }
        if (draggedBody.position.x > boardWidth - limit) {
          Matter.Body.setPosition(draggedBody, { x: boardWidth - limit, y: draggedBody.position.y });
        }
        if (draggedBody.position.y < limit) {
          Matter.Body.setPosition(draggedBody, { x: draggedBody.position.x, y: limit });
        }
      }
    });
    
    dispatch('boardready', { world, width: boardWidth, height: boardHeight });
  });

  function handleBasketCreated(event: CustomEvent<{ body: Matter.Body }>) {
      baskets.push(event.detail.body);
      Matter.World.add(world, event.detail.body);
  }

  async function checkAllBaskets() {
    if (!baskets.length || !world) return;

    // Esperamos un ciclo para que la simulación de físicas se asiente tras soltar
    await tick(); 

    for (const basket of baskets) {
      const cubesInBasket = world.bodies.filter(body => 
        body.label === 'Cube Body' && Matter.Bounds.contains(basket.bounds, body.position)
      );

      dispatch('basketupdate', { basketId: basket.id, count: cubesInBasket.length });

      if (cubesInBasket.length === 2) {
        const [cubeA, cubeB] = cubesInBasket;
        const valA = (cubeA as any).cubeValue as number;
        const valB = (cubeB as any).cubeValue as number;
        let result: number | null = null;

        switch ((basket as any).operation) {
          case 'add':
            result = valA + valB;
            break;
          case 'subtract':
            result = Math.max(valA, valB) - Math.min(valA, valB);
            break;
          case 'multiply':
            result = valA * valB;
            break;
          case 'divide':
            const higher = Math.max(valA, valB);
            const lower = Math.min(valA, valB);
            if (lower !== 0 && higher % lower === 0) {
              result = higher / lower;
            }
            break;
        }

        if (result !== null) {
          removeNumber((cubeA as any).cubeId);
          removeNumber((cubeB as any).cubeId);
          addNumber(result, basket.position.x, basket.position.y);
        }
      }
    }
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
    touch-action: none; /* Para mejorar la experiencia en móviles */
  }
</style>
