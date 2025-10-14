
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition';
    import { t } from './i18n';

    const dispatch = createEventDispatcher();
</script>

<div class="modal-backdrop">
    <div class="modal-content" in:fly={{ y: -50, duration: 500 }}>
        <h2 class="title">{$t.victoryTitle}</h2>
        <p class="subtitle">{$t.victorySubtitle}</p>
        <button class="play-again-btn" on:click={() => dispatch('playAgain')}>
            {$t.playAgain}
        </button>
    </div>
</div>

<style>
    .modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        padding: 0;
    }

    .modal-content {
        font-family: 'Patrick Hand', cursive;
        background-color: #fff9f0;
        padding: 3rem 5rem;
        border-radius: 25px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        border: 5px solid #a0522d;
        max-width: 600px;
        width: 90%;
        margin: auto;
    }

    .title {
        font-size: 3rem;
        color: #d2691e;
        margin: 0;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
    }

    .subtitle {
        font-size: 1.5rem;
        color: #5d4037;
        margin: 0.5rem 0 2.5rem 0;
    }

    .play-again-btn {
        font-family: 'Patrick Hand', cursive;
        font-size: 1.5rem;
        padding: 0.7em 1.8em;
        background-color: #a0522d;
        color: white;
        border: none;
        border-radius: 15px;
        box-shadow: 0 5px 12px rgba(0,0,0,0.2);
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .play-again-btn:hover {
        background-color: #5d4037;
        transform: translateY(-3px);
        box-shadow: 0 8px 18px rgba(0,0,0,0.25);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .modal-content {
            width: 95%;
            padding: 2rem 2rem;
            border-radius: 20px;
        }

        .title {
            font-size: 2.2rem;
        }

        .subtitle {
            font-size: 1.2rem;
            margin: 0.5rem 0 2rem 0;
        }

        .play-again-btn {
            font-size: 1.3rem;
            padding: 0.6em 1.5em;
        }
    }

    @media (max-width: 480px) {
        .modal-content {
            width: 96%;
            padding: 1.5rem 1.2rem;
            border-width: 3px;
            border-radius: 15px;
        }

        .title {
            font-size: 1.8rem;
        }

        .subtitle {
            font-size: 1rem;
        }

        .play-again-btn {
            font-size: 1.2rem;
        }
    }
</style>
