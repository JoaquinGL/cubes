
<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import Matter from "matter-js";

    export let id: number;
    export let number: number;
    export let world: Matter.World;
    export let x: number = Math.random() * 400 + 50;
    export let y: number = Math.random() * 100;

    let element: HTMLElement;
    let body: Matter.Body;

    onMount(() => {
        const { Bodies, World } = Matter;

        body = Bodies.rectangle(x, y, 70, 70, {
            restitution: 0.5,
            friction: 0.1,
            customData: {
                id: id,
                number: number,
            },
            label: 'Rectangle Body'
        });

        // ¡Aquí está la conexión clave!
        // Guardamos una referencia al elemento HTML en el cuerpo de Matter.js.
        (body as any).element = element;

        World.add(world, body);

        function update() {
            if (body && element) {
                element.style.transform = `translate(${body.position.x - 35}px, ${body.position.y - 35}px) rotate(${body.angle}rad)`;
            }
            requestAnimationFrame(update);
        }
        update();
    });

    onDestroy(() => {
        if (world && body) {
            World.remove(world, body);
        }
    });
</script>

<div class="cube" bind:this={element}>
    <span>{number}</span>
</div>

<style>
    .cube {
        position: absolute;
        z-index: 1; /* Añadimos un z-index base */
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
</style>
