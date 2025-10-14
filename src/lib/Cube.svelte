
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Matter from 'matter-js';

  export let id: number;
  export let number: number;
  export let world: Matter.World;
  export let x: number | undefined = undefined;
  export let y: number | undefined = undefined;

  let element: HTMLElement;
  let body: Matter.Body;

  // Responsive cube size
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isSmallMobile = typeof window !== 'undefined' && window.innerWidth < 480;
  const cubeSize = isSmallMobile ? 50 : isMobile ? 60 : 70;
  const cubeHalf = cubeSize / 2;

  // Calculate responsive board width for fallback position
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const containerPadding = isSmallMobile ? 8 : isMobile ? 16 : 32;
  const boardWidth = isMobile 
    ? Math.min(viewportWidth - containerPadding * 2, 1000)
    : 1000;
  
  const margin = cubeSize / 2 + 30;
  const initialX = x !== undefined ? x : Math.random() * (boardWidth - margin * 2) + margin;
  const initialY = y !== undefined ? y : 50;

  onMount(() => {
    const { Bodies } = Matter;
    
    body = Bodies.rectangle(initialX, initialY, cubeSize, cubeSize, {
      restitution: 0.5,
      friction: 0.1,
      label: `cube-${id}`
    });

    (body as any).element = element;

    Matter.World.add(world, body);

    let renderLoop: number;
    function update() {
      if (body && element) {
        // Esta línea es la única fuente de verdad para la posición del cubo.
        element.style.transform = `translate(${body.position.x - cubeHalf}px, ${body.position.y - cubeHalf}px) rotate(${body.angle}rad)`;
      }
      renderLoop = requestAnimationFrame(update);
    }
    update();

    return () => {
        cancelAnimationFrame(renderLoop);
    }
  });

  onDestroy(() => {
    if (world && body) {
      Matter.World.remove(world, body);
    }
  });
</script>

<div 
  class="cube"
  bind:this={element}
>
  <span>{number}</span>
</div>

<style>
  .cube {
    position: absolute;
    z-index: 1;
    width: 70px;
    height: 70px;
    background-color: #f5f5dc;
    border: 4px solid #d2b48c;
    border-radius: 10px;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: grab;
  }

  .cube:active {
    cursor: grabbing;
    box-shadow: 8px 8px 15px rgba(0,0,0,0.3);
  }

  span {
    font-family: 'Patrick Hand', cursive;
    font-size: 2.5rem;
    color: #5d4037;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .cube {
      width: 60px;
      height: 60px;
      border-width: 3px;
    }

    span {
      font-size: 2rem;
    }
  }

  @media (max-width: 480px) {
    .cube {
      width: 50px;
      height: 50px;
      border-width: 2px;
      border-radius: 8px;
    }

    span {
      font-size: 1.6rem;
    }
  }
</style>
