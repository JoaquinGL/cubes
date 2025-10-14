
<script lang="ts">
  import { onMount, createEventDispatcher, onDestroy } from 'svelte';
  import Matter from 'matter-js';
  import { setupEngine, addBoundaries } from './engine';

  const dispatch = createEventDispatcher();

  export let basketsVisible: boolean = false;

  let container: HTMLElement;
  let engine: Matter.Engine | null = null;
  let world: Matter.World | null = null;
  let renderLoop: number;

  const basketStates: { [key: string]: { [bodyId: number]: { body: Matter.Body; timer: number | null; marked: boolean } } } = {
    suma: {},
    resta: {},
    multiplicacion: {},
    division: {}
  };

  let zones: { label: string; x: number; y: number; width: number; height: number; bounds: Matter.Bounds }[] = [];

  // --- Reactive logic for creating/destroying basket walls ---
  $: if (world) {
    if (basketsVisible) {
      createBasketWalls();
    } else {
      removeBasketWalls();
    }
  }

  function createBasketWalls() {
    if (!world || !container) return;
    const boardWidth = container.clientWidth;
    const isMobile = boardWidth < 768;
    let basketWidth, basketHeight, sideMargin, basketPositions;

    // Define layout based on screen size
    if (isMobile) {
        basketWidth = 100; basketHeight = 100; sideMargin = 60;
        const topMargin = 80, gap = 120;
        basketPositions = {
            suma: { x: boardWidth - sideMargin, y: topMargin },
            resta: { x: boardWidth - sideMargin, y: topMargin + gap },
            multiplicacion: { x: boardWidth - sideMargin, y: topMargin + gap * 2 },
            division: { x: boardWidth - sideMargin, y: topMargin + gap * 3 }
        };
    } else {
        basketWidth = 200; basketHeight = 120; sideMargin = 150;
        basketPositions = {
            suma: { x: sideMargin, y: 200 },
            resta: { x: sideMargin, y: 400 },
            multiplicacion: { x: boardWidth - sideMargin, y: 200 },
            division: { x: boardWidth - sideMargin, y: 400 }
        };
    }
    
    // Create and add physical walls to the world
    zones.forEach(zone => {
      const pos = basketPositions[zone.label];
      if (!pos) return;
      const wallThickness = 20;

      const floor = Matter.Bodies.rectangle(pos.x, pos.y + basketHeight / 2, basketWidth + wallThickness, wallThickness, { isStatic: true, label: `basket-wall-${zone.label}-floor`, render: { visible: false } });
      const leftWall = Matter.Bodies.rectangle(pos.x - basketWidth / 2 - wallThickness / 2, pos.y, wallThickness, basketHeight + wallThickness, { isStatic: true, label: `basket-wall-${zone.label}-left`, render: { visible: false } });
      const rightWall = Matter.Bodies.rectangle(pos.x + basketWidth / 2 + wallThickness / 2, pos.y, wallThickness, basketHeight + wallThickness, { isStatic: true, label: `basket-wall-${zone.label}-right`, render: { visible: false } });
      
      Matter.World.add(world, [floor, leftWall, rightWall]);
    });
  }

  function removeBasketWalls() {
    if (!world) return;
    const wallsToRemove = Matter.Composite.allBodies(world).filter(
        body => body.label.startsWith('basket-wall')
    );
    if (wallsToRemove.length > 0) {
        Matter.World.remove(world, wallsToRemove);
    }
  }

  onMount(() => {
    const engineSetup = setupEngine(container);
    engine = engineSetup.engine;
    world = engineSetup.world;
    const { mouseConstraint } = engineSetup;

    const boardWidth = container.clientWidth;
    const boardHeight = container.clientHeight;
    addBoundaries(world, boardWidth, boardHeight);

    const isMobile = boardWidth < 768;
    let basketWidth, basketHeight, sideMargin, basketPositions;

    if (isMobile) {
        basketWidth = 100; basketHeight = 100; sideMargin = 60;
        const topMargin = 80, gap = 120;
        basketPositions = {
            suma: { x: boardWidth - sideMargin, y: topMargin },
            resta: { x: boardWidth - sideMargin, y: topMargin + gap },
            multiplicacion: { x: boardWidth - sideMargin, y: topMargin + gap * 2 },
            division: { x: boardWidth - sideMargin, y: topMargin + gap * 3 }
        };
    } else {
        basketWidth = 200; basketHeight = 120; sideMargin = 150;
        basketPositions = {
            suma: { x: sideMargin, y: 200 },
            resta: { x: sideMargin, y: 400 },
            multiplicacion: { x: boardWidth - sideMargin, y: 200 },
            division: { x: boardWidth - sideMargin, y: 400 }
        };
    }
    
    zones = Object.keys(basketPositions).map(label => {
      const pos = basketPositions[label];
      const rect = Matter.Bodies.rectangle(pos.x, pos.y, basketWidth, basketHeight);
      return { label, ...pos, width: basketWidth, height: basketHeight, bounds: rect.bounds };
    });

    function gameLoop() {
      if (!world) return;
      const allCubes = Matter.Composite.allBodies(world).filter(b => b.label.startsWith('cube'));
      
      zones.forEach(zone => {
        const zoneState = basketStates[zone.label];
        if (zoneState && basketsVisible) {
          allCubes.forEach(cube => {
            if (!cube.id) return;
            const isInside = Matter.Bounds.contains(zone.bounds, cube.position);
            const state = zoneState[cube.id];

            if (isInside && !state) {
              const timer = window.setTimeout(() => {
                if (zoneState[cube.id]) {
                  zoneState[cube.id].marked = true;
                }
              }, 1000);
              zoneState[cube.id] = { body: cube, timer, marked: false };
            } else if (!isInside && state) {
              if (state.timer) clearTimeout(state.timer);
              delete zoneState[cube.id];
            }
          });

          const markedCubes = Object.values(zoneState).filter(s => s.marked);

          if (markedCubes.length === 2) {
            const bodyA = markedCubes[0].body;
            const bodyB = markedCubes[1].body;
            
            dispatch('operation', { bodyA, bodyB, operation: zone.label });
            if(bodyA.id) delete zoneState[bodyA.id];
            if(bodyB.id) delete zoneState[bodyB.id];
          }
        }
      });

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
    Object.values(basketStates).forEach(zoneState => {
      for (const id in zoneState) {
        if(zoneState[id].timer) clearTimeout(zoneState[id].timer);
      }
    });
    removeBasketWalls(); // Clean up on component destruction
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
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 768px) {
    .board-container {
        width: 100%;
        border-width: 4px;
        border-radius: 15px;
        height: 550px;
    }
  }
</style>
