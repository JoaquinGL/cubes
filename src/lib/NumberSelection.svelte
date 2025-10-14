
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import HowToPlayModal from './HowToPlayModal.svelte';
    import { t, currentLanguage, setLanguage, type Language } from './i18n';

    const dispatch = createEventDispatcher();

    let selectedCount = 2; 
    let showHowToPlay = false;
    const options = [2, 3, 4];

    function startGame() {
        dispatch('start', { largeNumbers: selectedCount });
    }

    function startRandom() {
        const randomCount = Math.floor(Math.random() * 5);
        dispatch('start', { largeNumbers: randomCount });
    }

    function handleLanguageChange(lang: Language) {
        setLanguage(lang);
    }
</script>

{#if showHowToPlay}
    <HowToPlayModal on:close={() => showHowToPlay = false} />
{/if}

<div class="container">
    <h1 class="title">{$t.title}</h1>
    <p class="subtitle">{$t.subtitle}</p>

    <div class="selector-box">
        <h2 class="selector-title">{$t.selectNumbers}</h2>
        <p class="selector-description">{$t.howManyLarge}</p>

        <div class="options">
            {#each options as count}
                <button 
                    class="option-btn" 
                    class:selected={selectedCount === count}
                    on:click={() => selectedCount = count}
                >
                    {count} {count === 1 ? $t.large : $t.larges}
                </button>
            {/each}
            <button class="option-btn random-option" on:click={startRandom}>
                {$t.randomTotal}
            </button>
        </div>
    </div>

    <div class="main-actions">
        <button class="start-btn" on:click={startGame}>{$t.startPlaying}</button>
    </div>

    <div class="bottom-actions">
        <div class="language-selector">
            <button 
                class="lang-btn" 
                class:active={$currentLanguage === 'es'}
                on:click={() => handleLanguageChange('es')}
            >
                🇪🇸 ES
            </button>
            <button 
                class="lang-btn" 
                class:active={$currentLanguage === 'en'}
                on:click={() => handleLanguageChange('en')}
            >
                🇬🇧 EN
            </button>
        </div>

        <button class="how-to-play-btn" on:click={() => showHowToPlay = true}>
            {$t.howToPlay}
        </button>
    </div>

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
        position: relative;
    }

    .bottom-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        max-width: 600px;
        margin-top: 2rem;
    }

    .language-selector {
        display: flex;
        gap: 0.5rem;
    }

    .lang-btn {
        font-family: 'Patrick Hand', cursive;
        font-size: 1rem;
        padding: 0.5em 1em;
        background-color: transparent;
        color: #8b4513;
        border: 2px solid #d2691e;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-weight: bold;
    }

    .lang-btn:hover {
        background-color: rgba(210, 105, 30, 0.1);
        transform: translateY(-2px);
    }

    .lang-btn.active {
        background-color: #d2691e;
        color: white;
        box-shadow: 0 3px 8px rgba(210, 105, 30, 0.4);
    }

    .random-option {
        background-color: #8b4513 !important;
        color: #fdf6e3 !important;
        border-color: #8b4513 !important;
    }

    .random-option:hover {
        background-color: #a0522d !important;
        color: white !important;
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
        justify-content: center;
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
        cursor: pointer;
        text-decoration: underline;
        transition: color 0.2s ease;
    }

    .how-to-play-btn:hover {
        color: #d2691e;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .bottom-actions {
            flex-direction: column;
            gap: 1.5rem;
            margin-top: 1.5rem;
        }

        .lang-btn {
            font-size: 0.9rem;
            padding: 0.4em 0.8em;
        }

        .title {
            font-size: 2.5rem;
        }

        .subtitle {
            font-size: 1.3rem;
        }

        .selector-box {
            padding: 1.5rem 1.5rem;
            margin-top: 1.5rem;
        }

        .selector-title {
            font-size: 1.8rem;
        }

        .selector-description {
            font-size: 1rem;
            margin-bottom: 1.5rem;
        }

        .options {
            flex-direction: column;
            gap: 1rem;
            width: 100%;
        }

        .option-btn {
            font-size: 1.2rem;
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
        }

        .main-actions {
            flex-direction: column;
            gap: 1rem;
            width: 100%;
        }

        .start-btn {
            font-size: 1.5rem;
            width: 100%;
            max-width: 300px;
        }

        .random-btn {
            font-size: 1.3rem;
            width: 100%;
            max-width: 300px;
        }

        .how-to-play-btn {
            font-size: 1.2rem;
        }
    }

    @media (max-width: 480px) {
        .title {
            font-size: 2rem;
        }

        .subtitle {
            font-size: 1.1rem;
        }

        .selector-box {
            padding: 1rem 1rem;
            border-width: 3px;
        }

        .selector-title {
            font-size: 1.5rem;
        }

        .selector-description {
            font-size: 0.9rem;
        }

        .option-btn {
            font-size: 1.1rem;
            padding: 0.7em 1.2em;
        }

        .start-btn {
            font-size: 1.3rem;
            padding: 0.5em 1.5em;
        }

        .random-btn {
            font-size: 1.1rem;
        }
    }

</style>
