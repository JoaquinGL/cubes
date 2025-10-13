
<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import Matter from 'matter-js';
  import { setupEngine, addBoundaries } from './engine';

  const dispatch = createEventDispatcher();

  let container: HTMLElement;
  let engine: Matter.Engine | null = null;
  let world: Matter.World | null = null;
  
  // Guarda los cubos que están en reposo en cada cesta
  const cubesInBaskets: { [key: string]: Matter.Body[] } = {
    suma: [], resta: [], multiplicar: [], dividir: []
  };
  let zones: { label: string; x: number; y: number; width: number; height: number; }[] = [];

  export function activateBaskets() {
    if (!world || !container) return;
    const boardWidth = container.clientWidth;
    const boardHeight = 600;
    const numBaskets = 4;
    const basketWidth = 200;
    const totalBasketsWidth = numBaskets * basketWidth;
    const gap = (boardWidth - totalBasketsWidth) / (numBaskets + 1);
    const basketHeight = 100;
    const wallThickness = 20;
    const basketY = boardHeight / 2;
    
    zones.forEach((def, index) => {
      const basketX = (index + 1) * gap + index * basketWidth + basketWidth / 2;
      const floor = Matter.Bodies.rectangle(basketX, basketY + basketHeight / 2, basketWidth + wallThickness, wallThickness, { isStatic: true, label: `${def.label}-floor`, render: { visible: false } });
      const leftWall = Matter.Bodies.rectangle(basketX - basketWidth / 2 - wallThickness / 2, basketY, wallThickness, basketHeight + wallThickness, { isStatic: true, label: `${def.label}-leftWall`, render: { visible: false } });
      const rightWall = Matter.Bodies.rectangle(basketX + basketWidth / 2 + wallThickness / 2, basketY, wallThickness, basketHeight + wallThickness, { isStatic: true, label: `${def.label}-rightWall`, render: { visible: false } });
      Matter.World.add(world, [floor, leftWall, rightWall]);
    });
  }

  // Nueva función para eliminar cuerpos del mundo físico
  export function removeBody(body: Matter.Body) {
    if (world && body) {
      Matter.World.remove(world, body);
    }
  }

  onMount(() => {
    const engineSetup = setupEngine(container);
    engine = engineSetup.engine;
    world = engineSetup.world;
    const { mouseConstraint } = engineSetup;

    const boardWidth = container.clientWidth;
    const boardHeight = 600;
    addBoundaries(world, boardWidth, boardHeight);

    const numBaskets = 4;
    const basketWidth = 200;
    const basketHeight = 100;
    const totalBasketsWidth = numBaskets * basketWidth;
    const gap = (boardWidth - totalBasketsWidth) / (numBaskets + 1);
    const basketDefinitions = [{ label: 'suma' }, { label: 'resta' }, { label: 'multiplicar' }, { label: 'dividir' }];
    const basketY = boardHeight / 2;
    zones = basketDefinitions.map((def, index) => {
      const basketX = (index + 1) * gap + index * basketWidth + basketWidth / 2;
      return { label: def.label, x: basketX, y: basketY, width: basketWidth, height: basketHeight };
    });

    // Evento que se dispara cuando un cuerpo se queda quieto
    Matter.Events.on(engine, 'sleepStart', (event) => {
      const body = event.source;
      if (!body.label.startsWith('cube')) return;

      for (const zone of zones) {
        if (Matter.Bounds.contains(Matter.Bodies.rectangle(zone.x, zone.y, zone.width, zone.height).bounds, body.position)) {
          const basket = cubesInBaskets[zone.label];
          if (!basket.find(b => b.id === body.id)) {
            basket.push(body);
          }

          if (basket.length === 2) {
            dispatch('operation', { bodyA: basket[0], bodyB: basket[1], operation: zone.label });
            cubesInBaskets[zone.label] = []; // Limpiar para la siguiente operación
          }
          break;
        }
      }
    });

    // Limpiar cubos de las cestas si se mueven
    Matter.Events.on(engine, 'sleepEnd', (event) => {
      const body = event.source;
      if (!body.label.startsWith('cube')) return;
      for (const op in cubesInBaskets) {
        cubesInBaskets[op] = cubesInBaskets[op].filter(b => b.id !== body.id);
      }
    });

    // ... resto del código de renderizado y arrastre ...
    (function render() {
      if (!world) return;
      const bodies = Matter.Composite.allBodies(world);
      bodies.forEach(body => {
        if ((body as any).element) {
          const element = (body as any).element as HTMLElement;
          const size = element.offsetWidth;
          element.style.transform = `translate(${body.position.x - size / 2}px, ${body.position.y - size / 2}px) rotate(${body.angle}rad)`;
        }
      });
      requestAnimationFrame(render);
    })();
    Matter.Events.on(mouseConstraint, 'startdrag', (event) => {
      if (event.body && (event.body as any).element) { (event.body as any).element.style.zIndex = '100'; }
    });
    Matter.Events.on(mouseConstraint, 'enddrag', (event) => {
      if (event.body && (event.body as any).element) { (event.body as any).element.style.zIndex = '1'; }
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
