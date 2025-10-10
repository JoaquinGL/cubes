
<script lang="ts">
    import { onMount } from "svelte";
    import Matter from "matter-js";

    export let world: Matter.World;
    export let x: number;
    export let y: number;
    export let label: string; // El símbolo de la operación: +, -, ×, ÷
    export let operation: string; // El nombre de la operación para la lógica: 'add', 'subtract', etc.

    let element: HTMLElement;

    onMount(() => {
        const { Bodies, World } = Matter;

        // Creamos un cuerpo estático y sensor.
        // "Sensor" significa que detectará colisiones pero no interactuará físicamente.
        const body = Bodies.rectangle(x, y, 90, 90, {
            isStatic: true,
            isSensor: true, // ¡Importante!
            label: `basket-${operation}`, // Etiqueta para identificar la cesta en las colisiones
        });

        World.add(world, body);
    });

</script>

<div class="basket" style="left: {x-45}px; top: {y-45}px;" bind:this={element}>
    <span>{label}</span>
</div>

<style>
    .basket {
        position: absolute;
        width: 90px;
        height: 90px;
        background-color: #d2b48c; /* Tono madera clara */
        border: 3px dashed #a0522d; /* Borde discontinuo para indicar que es una zona de drop */
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
    }

    span {
        font-family: 'Patrick Hand', cursive;
        font-size: 3rem;
        font-weight: bold;
        color: #fff;
        text-shadow: 2px 2px 3px rgba(81, 48, 32, 0.5);
    }
</style>
