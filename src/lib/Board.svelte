
<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import Matter from 'matter-js';
  import { setupEngine, addBoundaries } from './engine';

  const dispatch = createEventDispatcher();

  let container: HTMLElement;
  let renderLoopId: number;
  let world: Matter.World | null = null;

  export function activateBaskets() {
    if (!world || !container) return;

    const boardWidth = container.clientWidth;
    const boardHeight = 600;

    const numBaskets = 4;
    const basketWidth = 200;
    const totalBasketsWidth = numBaskets * basketWidth;
    const gap = (boardWidth - totalBasketsWidth) / (numBaskets + 1);

    const basketDefinitions = [
      { label: 'suma' }, { label: 'resta' }, 
      { label: 'multiplicar' }, { label: 'dividir' },
    ];
    
    const basketHeight = 100;
    const wallThickness = 20;
    // Centramos las cestas verticalmente
    const basketY = boardHeight / 2;
    const allBasketBodies: Matter.Body[] = [];

    basketDefinitions.forEach((def, index) => {
      const basketX = (index + 1) * gap + index * basketWidth + basketWidth / 2;

      const floor = Matter.Bodies.rectangle(basketX, basketY + basketHeight / 2, basketWidth + wallThickness, wallThickness, { isStatic: true, label: `${def.label}-floor`, render: { visible: false } });
      const leftWall = Matter.Bodies.rectangle(basketX - basketWidth / 2 - wallThickness / 2, basketY, wallThickness, basketHeight + wallThickness, { isStatic: true, label: `${def.label}-leftWall`, render: { visible: false } });
      const rightWall = Matter.Bodies.rectangle(basketX + basketWidth / 2 + wallThickness / 2, basketY, wallThickness, basketHeight + wallThickness, { isStatic: true, label: `${def.label}-rightWall`, render: { visible: false } });

      allBasketBodies.push(floor, leftWall, rightWall);
    });

    Matter.World.add(world, allBasketBodies);
  }

  onMount(() => {
    const engineSetup = setupEngine(container);
    world = engineSetup.world;
    const { mouseConstraint } = engineSetup;
    const boardWidth = container.clientWidth;
    const boardHeight = 600;
    addBoundaries(world, boardWidth, boardHeight);

    const numBaskets = 4;
    const basketWidth = 200;
    const totalBasketsWidth = numBaskets * basketWidth;
    const gap = (boardWidth - totalBasketsWidth) / (numBaskets + 1);
    const basketDefinitions = [{ label: 'suma' }, { label: 'resta' }, { label: 'multiplicar' }, { label: 'dividir' }];
    const basketHeight = 100;
    // Centramos las cestas verticalmente
    const basketY = boardHeight / 2;
    const zoneData = basketDefinitions.map((def, index) => {
      const basketX = (index + 1) * gap + index * basketWidth + basketWidth / 2;
      return { label: def.label, x: basketX, y: basketY, width: basketWidth, height: basketHeight };
    });

    (function render() {
      const bodies = Matter.Composite.allBodies(world!);
      bodies.forEach(body => {
        if ((body as any).element) {
          const element = (body as any).element as HTMLElement;
          const size = element.offsetWidth;
          element.style.transform = `translate(${body.position.x - size / 2}px, ${body.position.y - size / 2}px) rotate(${body.angle}rad)`;
        }
      });
      renderLoopId = requestAnimationFrame(render);
    })();

    Matter.Events.on(mouseConstraint, 'startdrag', (event) => {
      if (event.body && (event.body as any).element) { (event.body as any).element.style.zIndex = '100'; }
    });
    Matter.Events.on(mouseConstraint, 'enddrag', (event) => {
      if (event.body && (event.body as any).element) { (event.body as any).element.style.zIndex = '1'; }
    });

    dispatch('boardready', { world, zones: zoneData });

    return () => {
      cancelAnimationFrame(renderLoopId);
    }
  });
</script>

<div class="board-container" bind:this={container}>
  <slot></slot>
</div>

<style>
  .board-container {
    width: 90vw;
    max-width: 1000px; /* Tablero más ancho */
    height: 600px;
    background-color: #fdf6e3;
    border: 8px solid #a0522d;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    touch-action: none;
  }
</style>
