
<script lang="ts">
  import { onMount, createEventDispatcher, onDestroy, afterUpdate } from 'svelte';
  import Matter from 'matter-js';
  import { setupEngine, addBoundaries } from './engine';

  const dispatch = createEventDispatcher();

  export let basketsVisible: boolean = false;

  let container: HTMLElement;
  let engine: Matter.Engine | null = null;
  let world: Matter.World | null = null;
  let renderLoop: number;

  const sumaBasketState: { [bodyId: number]: { body: Matter.Body; timer: number | null; marked: boolean } } = {};

  let zones: { label: string; x: number; y: number; width: number; height: number; bounds: Matter.Bounds }[] = [];
  let basketsActivated = false;

  afterUpdate(() => {
    if (basketsVisible && !basketsActivated) {
      activateBaskets();
      basketsActivated = true;
    }
  });

  function activateBaskets() {
    if (!world || !container) return;
    const boardWidth = container.clientWidth;
    const boardHeight = 600;
    const basketWidth = 200;
    const basketHeight = 120;
    const wallThickness = 20;
    const sideMargin = 150;

    const basketPositions = {
      suma: { x: sideMargin, y: boardHeight / 2 },
    };
    
    zones.forEach(zone => {
      const pos = basketPositions[zone.label];
      const floor = Matter.Bodies.rectangle(pos.x, pos.y + basketHeight / 2, basketWidth + wallThickness, wallThickness, { isStatic: true, label: `${zone.label}-floor`, render: { visible: false } });
      const leftWall = Matter.Bodies.rectangle(pos.x - basketWidth / 2 - wallThickness / 2, pos.y, wallThickness, basketHeight + wallThickness, { isStatic: true, label: `${zone.label}-leftWall`, render: { visible: false } });
      const rightWall = Matter.Bodies.rectangle(pos.x + basketWidth / 2 + wallThickness / 2, pos.y, wallThickness, basketHeight + wallThickness, { isStatic: true, label: `${zone.label}-rightWall`, render: { visible: false } });
      Matter.World.add(world, [floor, leftWall, rightWall]);
    });
  }

  onMount(() => {
    const engineSetup = setupEngine(container);
    engine = engineSetup.engine;
    world = engineSetup.world;
    const { mouseConstraint } = engineSetup;

    const boardWidth = container.clientWidth;
    const boardHeight = 600;
    addBoundaries(world, boardWidth, boardHeight);

    const basketWidth = 200;
    const basketHeight = 120;
    const sideMargin = 150;

    const basketPositions = {
      suma: { x: sideMargin, y: boardHeight / 2 },
    };
    
    zones = Object.keys(basketPositions).map(label => {
      const pos = basketPositions[label];
      const rect = Matter.Bodies.rectangle(pos.x, pos.y, basketWidth, basketHeight);
      return { label, ...pos, width: basketWidth, height: basketHeight, bounds: rect.bounds };
    });

    function gameLoop() {
      if (!world) return;
      const allCubes = Matter.Composite.allBodies(world).filter(b => b.label.startsWith('cube'));
      const sumaZone = zones.find(z => z.label === 'suma');

      if (sumaZone && basketsVisible) {
        allCubes.forEach(cube => {
          const isInside = Matter.Bounds.contains(sumaZone.bounds, cube.position);
          const state = sumaBasketState[cube.id];

          if (isInside && !state) {
            const timer = window.setTimeout(() => {
              if (sumaBasketState[cube.id]) {
                sumaBasketState[cube.id].marked = true;
              }
            }, 1000);
            sumaBasketState[cube.id] = { body: cube, timer, marked: false };
          } else if (!isInside && state) {
            if (state.timer) clearTimeout(state.timer);
            delete sumaBasketState[cube.id];
          }
        });

        const markedCubes = Object.values(sumaBasketState).filter(s => s.marked);

        if (markedCubes.length === 2) {
          const bodyA = markedCubes[0].body;
          const bodyB = markedCubes[1].body;
          
          dispatch('operation', { bodyA, bodyB, operation: 'suma', boardWidth: container.clientWidth });
          delete sumaBasketState[bodyA.id];
          delete sumaBasketState[bodyB.id];
        }
      }
      // EL CÓDIGO CONFLICTIVO HA SIDO ELIMINADO DE AQUÍ
      renderLoop = requestAnimationFrame(gameLoop);
    }

    renderLoop = requestAnimationFrame(gameLoop);

    Matter.Events.on(mouseConstraint, 'startdrag', (event) => {
      if (event.body && (event.body as any).element) (event.body as any).element.style.zIndex = '100';
    });
    Matter.Events.on(mouseConstraint, 'enddrag', (event) => {
      if (event.body && (event.body as any).element) (event.body as any).element.style.zIndex = '1';
    });

    dispatch('boardready', { world, zones });
  });

  onDestroy(() => {
    cancelAnimationFrame(renderLoop);
    for (const id in sumaBasketState) {
        if(sumaBasketState[id].timer) clearTimeout(sumaBasketState[id].timer);
    }
  });
</script>

<div class="board-container" bind:this={container}>
  <slot></slot>
</div>

<style>
  .board-container {
    width: 90vw;
    max-width: 1000px;
    height: 600px;
    background-color: #fdf6e3;
    border: 8px solid #a0522d;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    touch-action: none;
  }
</style>
