
<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let selectedCount = 1; // Un valor por defecto
    const options = [0, 1, 2, 3, 4];

    function startGame() {
        dispatch('start', { largeNumbers: selectedCount });
    }
</script>

<div class="container">
    <h1 class="title">El Desafío Aritmético</h1>
    <p class="subtitle">Prepara tu mente para el cálculo</p>

    <div class="selector-box">
        <h2 class="selector-title">Elige tus números</h2>
        <p class="selector-description">¿Cuántos números "grandes" quieres? (25, 50, 75, 100)</p>

        <div class="options">
            {#each options as count}
                <button 
                    class="option-btn" 
                    class:selected={selectedCount === count}
                    on:click={() => selectedCount = count}
                >
                    {count} grande{count === 1 ? '' : 's'}
                </button>
            {/each}
        </div>
    </div>

    <button class="start-btn" on:click={startGame}>¡Empezar a Jugar!</button>

</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-family: 'Patrick Hand', cursive;
        background-color: #fdf6e3; /* Fondo principal del juego */
        color: #5d4037;
        text-align: center;
    }

    .title {
        font-size: 4rem;
        margin-bottom: 0.5rem;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    }

    .subtitle {
        font-size: 1.8rem;
        margin-top: 0;
        color: #8b4513;
    }

    .selector-box {
        background-color: rgba(239, 227, 201, 0.7);
        padding: 2rem 3rem;
        border-radius: 20px;
        margin-top: 3rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        border: 4px solid #cdbda1;
    }

    .selector-title {
        font-size: 2.2rem;
        margin: 0 0 1rem 0;
    }
    
    .selector-description {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        color: #a0522d;
    }

    .options {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        margin-bottom: 2rem;
    }

    .option-btn {
        font-family: 'Patrick Hand', cursive;
        font-size: 1.3rem;
        padding: 0.8em 1.5em;
        border: 2px solid #d2691e;
        background-color: transparent;
        color: #d2691e;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-weight: bold;
    }

    .option-btn:hover {
        background-color: #d2691e;
        color: white;
        transform: translateY(-3px);
    }
    
    .option-btn.selected {
        background-color: #d2691e;
        color: white;
        box-shadow: 0 4px 10px rgba(210, 105, 30, 0.4);
    }

    .start-btn {
        margin-top: 2rem;
        font-family: 'Patrick Hand', cursive;
        font-size: 1.8rem;
        padding: 0.6em 2em;
        background-color: #a0522d;
        color: white;
        border: none;
        border-radius: 15px;
        box-shadow: 0 6px 15px rgba(0,0,0,0.2);
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .start-btn:hover {
        background-color: #5d4037;
        transform: translateY(-4px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.25);
    }
</style>
