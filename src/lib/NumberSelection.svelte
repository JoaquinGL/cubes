
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import HowToPlayModal from './HowToPlayModal.svelte';

    const dispatch = createEventDispatcher();

    let selectedCount = 1; 
    let showHowToPlay = false;
    const options = [0, 1, 2, 3, 4];

    function startGame() {
        dispatch('start', { largeNumbers: selectedCount });
    }

    function startRandom() {
        const randomCount = Math.floor(Math.random() * 5);
        dispatch('start', { largeNumbers: randomCount });
    }
</script>

{#if showHowToPlay}
    <HowToPlayModal on:close={() => showHowToPlay = false} />
{/if}

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

    <div class="main-actions">
        <button class="start-btn" on:click={startGame}>¡Empezar a Jugar!</button>
        <button class="start-btn random-btn" on:click={startRandom}>Random Total</button>
    </div>

    <button class="how-to-play-btn" on:click={() => showHowToPlay = true}>
        ¿Cómo se Juega?
    </button>

</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-family: 'Patrick Hand', cursive;
        background-color: #fdf6e3; 
        color: #5d4037;
        text-align: center;
        padding: 1rem;
        box-sizing: border-box;
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
        margin-top: 2rem;
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
        margin-bottom: 1rem;
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

    .main-actions {
        display: flex;
        gap: 1.5rem;
        margin-top: 2rem;
        align-items: center;
    }

    .start-btn {
        font-family: 'Patrick Hand', cursive;
        padding: 0.6em 2em;
        border: none;
        border-radius: 15px;
        box-shadow: 0 6px 15px rgba(0,0,0,0.2);
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .start-btn:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.25);
    }

    .start-btn {
        font-size: 1.8rem;
        background-color: #a0522d;
        color: white;
    }
    
    .start-btn:hover {
         background-color: #5d4037;
    }

    .random-btn {
        font-size: 1.5rem;
        background-color: #8b4513;
        color: #fdf6e3;
    }
    .random-btn:hover {
        background-color: #a0522d;
    }

    .how-to-play-btn {
        font-family: 'Patrick Hand', cursive;
        font-size: 1.3rem;
        background: none;
        border: none;
        color: #a0522d;
        margin-top: 2rem;
        cursor: pointer;
        text-decoration: underline;
        transition: color 0.2s ease;
    }

    .how-to-play-btn:hover {
        color: #d2691e;
    }

</style>
