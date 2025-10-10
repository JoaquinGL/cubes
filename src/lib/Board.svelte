
<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import Matter from 'matter-js';
  import { setupEngine, addBoundaries } from './engine';

  const dispatch = createEventDispatcher();

  let container: HTMLElement;
  let world: Matter.World;
  let engine: Matter.Engine;

  onMount(() => {
    const { engine: eng, world: wrld, mouseConstraint } = setupEngine(container);
    engine = eng;
    world = wrld;
    const boardWidth = container.clientWidth;
    const boardHeight = 600;
    addBoundaries(world, boardWidth, boardHeight);

    let draggedBody: Matter.Body | null = null;
    let originalInertia: number | undefined;

    function setAllCubesPointerEvents(value: 'none' | 'auto') {
        world.bodies.forEach(body => {
            if (body.label === 'Rectangle Body') {
                const el = (body as any).element as HTMLElement;
                if (el) {
                    el.style.pointerEvents = value;
                }
            }
        });
    }

    Matter.Events.on(mouseConstraint, 'startdrag', (event) => {
        draggedBody = event.body;
        setAllCubesPointerEvents('none');
        originalInertia = draggedBody.inertia;
        Matter.Body.setInertia(draggedBody, Infinity);
        Matter.Body.setAngle(draggedBody, 0);
        const element = (draggedBody as any).element as HTMLElement;
        if(element) {
            element.style.pointerEvents = 'auto';
            element.style.zIndex = '100';
        }
    });

    Matter.Events.on(mouseConstraint, 'enddrag', (event) => {
        setAllCubesPointerEvents('auto');
        if(draggedBody) {
            if (originalInertia !== undefined) {
                Matter.Body.setInertia(draggedBody, originalInertia);
                originalInertia = undefined;
            }
            const element = (draggedBody as any).element as HTMLElement;
            if(element) {
                element.style.zIndex = '1';
            }
            draggedBody = null;
        }
    });

    // --- ¡NUEVA LÓGICA DE CONTENCIÓN! ---
    Matter.Events.on(engine, 'beforeUpdate', () => {
        if (draggedBody) {
            const halfWidth = (draggedBody as any).element.clientWidth / 2;
            const halfHeight = (draggedBody as any).element.clientHeight / 2;

            const newPosition = { ...draggedBody.position };

            // Comprobar y corregir límite izquierdo
            if (newPosition.x < halfWidth) newPosition.x = halfWidth;
            // Comprobar y corregir límite derecho
            if (newPosition.x > boardWidth - halfWidth) newPosition.x = boardWidth - halfWidth;
            // Comprobar y corregir límite superior
            if (newPosition.y < halfHeight) newPosition.y = halfHeight;
            // Comprobar y corregir límite inferior
            if (newPosition.y > boardHeight - halfHeight) newPosition.y = boardHeight - halfHeight;
            
            Matter.Body.setPosition(draggedBody, newPosition);
        }
    });

    dispatch('boardready', { world });
  });

</script>

<div class="board-container" bind:this={container}>
  <slot></slot>
</div>

<style>
  .board-container {
    width: 100%;
    height: 600px;
    position: relative;
    border: 5px solid #a0522d;
    border-radius: 10px;
    overflow: hidden;
  }
</style>
