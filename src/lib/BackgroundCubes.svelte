<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Matter from 'matter-js';

  let container: HTMLElement;
  let engine: Matter.Engine | null = null;
  let world: Matter.World | null = null;
  let renderLoop: number;

  interface BackgroundCube {
    id: number;
    value: number;
    body: Matter.Body;
    element: HTMLElement;
    layer: number; // 0 = front, 1 = middle, 2 = back
    size: number;
  }

  let cubes: BackgroundCube[] = [];
  let cubeIdCounter = 0;

  onMount(() => {
    // Create engine
    engine = Matter.Engine.create();
    world = engine.world;
    
    // Set base gravity for rain effect
    engine.world.gravity.y = 0.1;
    engine.world.gravity.x = 0;

    // Create invisible boundaries
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Only bottom boundary to let cubes fall off
    const ground = Matter.Bodies.rectangle(width / 2, height + 50, width, 100, { 
      isStatic: true, 
      render: { visible: false } 
    });
    
    Matter.World.add(world, ground);

    // Start physics engine (no renderer needed)
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Create initial cubes
    createInitialCubes();

    // Add new cubes periodically
    const addCubeInterval = setInterval(addRandomCube, 3000);

    // Cleanup
    onDestroy(() => {
      clearInterval(addCubeInterval);
      if (engine) {
        Matter.Runner.stop(runner);
        Matter.Engine.clear(engine);
      }
      cancelAnimationFrame(renderLoop);
    });

    // Animation loop
    function animate() {
      if (world) {
        // Update cube positions
        cubes.forEach(cube => {
          if (cube.body && cube.element) {
            const x = cube.body.position.x;
            const y = cube.body.position.y;
            const angle = cube.body.angle;
            
            // Apply parallax effect based on layer
            const parallaxOffsetX = cube.layer * 0.3;
            const parallaxOffsetY = cube.layer * 0.2;
            const finalX = x + parallaxOffsetX;
            const finalY = y + parallaxOffsetY;
            
            cube.element.style.transform = `translate(${finalX - cube.size/2}px, ${finalY - cube.size/2}px) rotate(${angle}rad) scale(${1 - cube.layer * 0.1})`;
            cube.element.style.opacity = `${0.7 - (cube.layer * 0.15)}`;
            cube.element.style.zIndex = `${5 - cube.layer}`;
          }
        });

        // Remove cubes that have fallen off screen
        cubes = cubes.filter(cube => {
          if (cube.body.position.y > height + 100) {
            if (world) Matter.World.remove(world, cube.body);
            if (cube.element.parentNode) {
              cube.element.parentNode.removeChild(cube.element);
            }
            return false;
          }
          return true;
        });
      }
      
      renderLoop = requestAnimationFrame(animate);
    }
    
    animate();
  });

  function createInitialCubes() {
    for (let i = 0; i < 8; i++) {
      addRandomCube();
    }
  }

  function addRandomCube() {
    if (!world || !container) {
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Random layer (0 = front, 1 = middle, 2 = back)
    const layer = Math.floor(Math.random() * 3);
    
    // Size based on layer (back = smaller, front = larger)
    const baseSize = 35;
    const size = baseSize + (2 - layer) * 20 + Math.random() * 25;
    
    // Random value
    const value = Math.floor(Math.random() * 20) + 1;
    
    // Random starting position (always from above)
    const x = Math.random() * width;
    const y = -50 - Math.random() * 100;
    
    // Random fall speed (some faster, some slower) - rain effect
    const randomSpeed = Math.random() * 0.12 + 0.01; // Between 0.01 and 0.13
    const randomGravity = Math.random() * 0.08 + 0.01; // Between 0.01 and 0.09
    
    // Create physics body
    const body = Matter.Bodies.rectangle(x, y, size, size, {
      restitution: 0.1 + Math.random() * 0.1, // Slight random bounce
      friction: 0.05,
      frictionAir: randomSpeed, // Random air resistance for different speeds
      density: 0.0005 + (layer * 0.0003), // Lighter for back layers
      label: `bg-cube-${cubeIdCounter}`
    });
    
    // Apply random gravity to individual body
    body.gravityScale = randomGravity;

    // Add to world
    Matter.World.add(world, body);

    // Create visual element
    const element = document.createElement('div');
    element.className = 'background-cube';
    
    element.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background-color: #f5f5dc;
      border: 2px solid #d2b48c;
      border-radius: 8px;
      box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Patrick Hand', cursive;
      font-size: ${size * 0.4}px;
      color: #5d4037;
      user-select: none;
      pointer-events: none;
      z-index: ${5 - layer};
      opacity: ${0.7 - (layer * 0.15)};
      transform: scale(1);
    `;
    element.textContent = value.toString();
    
    container.appendChild(element);

    // Store cube data
    const cube: BackgroundCube = {
      id: cubeIdCounter++,
      value,
      body,
      element,
      layer,
      size
    };
    
    cubes.push(cube);
  }
</script>

<div class="background-container" bind:this={container}>
  <!-- Cubes are created dynamically -->
</div>

<style>
  .background-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
    z-index: 5;
  }

  .background-cube {
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
</style>
