
<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import Matter from 'matter-js';
  import { setupEngine, addBoundaries } from './engine';

  const dispatch = createEventDispatcher();

  let container: HTMLElement;
  let engine: Matter.Engine | null = null;
  let world: Matter.World | null = null;
  
  const cubesInBaskets: { [key: string]: Matter.Body[] } = {
    suma: [], resta: [], multiplicar: [], dividir: []
  };
  let zones: { label: string; x: number; y: number; width: number; height: number; }[] = [];

  export function activateBaskets() {
    if (!world || !container) return;
    const boardWidth = container.clientWidth;
    const boardHeight = 600;
    const basketWidth = 150; // Un poco más estrechas
    const basketHeight = 120;
    const wallThickness = 20;
    const verticalGap = 50; // Espacio entre cestas apiladas
    const sideMargin = 100; // Margen desde los bordes laterales

    const basketPositions = {
      suma: { x: sideMargin, y: boardHeight / 2 - basketHeight / 2 - verticalGap / 2 },
      resta: { x: sideMargin, y: boardHeight / 2 + basketHeight / 2 + verticalGap / 2 },
      multiplicar: { x: boardWidth - sideMargin, y: boardHeight / 2 - basketHeight / 2 - verticalGap / 2 },
      dividir: { x: boardWidth - sideMargin, y: boardHeight / 2 + basketHeight / 2 + verticalGap / 2 },
    };
    
    zones.forEach(zone => {
      const pos = basketPositions[zone.label];
      const floor = Matter.Bodies.rectangle(pos.x, pos.y + basketHeight / 2, basketWidth + wallThickness, wallThickness, { isStatic: true, label: `${zone.label}-floor`, render: { visible: false } });
      const leftWall = Matter.Bodies.rectangle(pos.x - basketWidth / 2 - wallThickness / 2, pos.y, wallThickness, basketHeight + wallThickness, { isStatic: true, label: `${zone.label}-leftWall`, render: { visible: false } });
      const rightWall = Matter.Bodies.rectangle(pos.x + basketWidth / 2 + wallThickness / 2, pos.y, wallThickness, basketHeight + wallThickness, { isStatic: true, label: `${zone.label}-rightWall`, render: { visible: false } });
      Matter.World.add(world, [floor, leftWall, rightWall]);
    });
  }

  export function removeBody(body: Matter.Body) {
    if (world && body) Matter.World.remove(world, body);
  }

  onMount(() => {
    const engineSetup = setupEngine(container);
    engine = engineSetup.engine;
    world = engineSetup.world;
    const { mouseConstraint } = engineSetup;

    const boardWidth = container.clientWidth;
    const boardHeight = 600;
    addBoundaries(world, boardWidth, boardHeight);

    const basketWidth = 150;
    const basketHeight = 120;
    const verticalGap = 50;
    const sideMargin = 100;

    const basketPositions = {
      suma: { x: sideMargin, y: boardHeight / 2 - basketHeight / 2 - verticalGap / 2 },
      resta: { x: sideMargin, y: boardHeight / 2 + basketHeight / 2 + verticalGap / 2 },
      multiplicar: { x: boardWidth - sideMargin, y: boardHeight / 2 - basketHeight / 2 - verticalGap / 2 },
      dividir: { x: boardWidth - sideMargin, y: boardHeight / 2 + basketHeight / 2 + verticalGap / 2 },
    };
    
    zones = Object.keys(basketPositions).map(label => ({
      label,
      ...basketPositions[label],
      width: basketWidth,
      height: basketHeight,
    }));

    Matter.Events.on(engine, 'sleepStart', (event) => {
      const body = event.source;
      if (!body.label.startsWith('cube')) return;
      for (const zone of zones) {
        const zoneBounds = Matter.Bodies.rectangle(zone.x, zone.y, zone.width, zone.height).bounds;
        if (Matter.Bounds.contains(zoneBounds, body.position)) {
          const basket = cubesInBaskets[zone.label];
          if (!basket.find(b => b.id === body.id)) basket.push(body);
          if (basket.length === 2) {
            dispatch('operation', { bodyA: basket[0], bodyB: basket[1], operation: zone.label });
            cubesInBaskets[zone.label] = [];
          }
          break;
        }
      }
    });

    Matter.Events.on(engine, 'sleepEnd', (event) => {
      const body = event.source;
      if (!body.label.startsWith('cube')) return;
      for (const op in cubesInBaskets) {
        cubesInBaskets[op] = cubesInBaskets[op].filter(b => b.id !== body.id);
      }
    });

    // ... Render loop and mouse constraints ...
    (function render() {
      if (!world) return;
      requestAnimationFrame(render);
      const bodies = Matter.Composite.allBodies(world);
      bodies.forEach(body => {
        if ((body as any).element) {
          const element = (body as any).element as HTMLElement;
          const size = element.offsetWidth;
          element.style.transform = `translate(${body.position.x - size / 2}px, ${body.position.y - size / 2}px) rotate(${body.angle}rad)`;
        }
      });
    })();
    Matter.Events.on(mouseConstraint, 'startdrag', (event) => {
      if (event.body && (event.body as any).element) (event.body as any).element.style.zIndex = '100';
    });
    Matter.Events.on(mouseConstraint, 'enddrag', (event) => {
      if (event.body && (event.body as any).element) (event.body as any).element.style.zIndex = '1';
    });

    dispatch('boardready', { world, zones });
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
