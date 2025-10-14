
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import { t } from './i18n';

  export let target: number;
  export let closestNumber: number;
  export let idealSolution: string | null;

  const dispatch = createEventDispatcher();
  const difference = Math.abs(target - closestNumber);
</script>

<div class="modal-backdrop">
  <div class="modal-content" in:fly={{ y: -50, duration: 500 }}>
    <h2 class="title">{$t.summaryTitle}</h2>
    {#if difference === 0}
      <p class="subtitle">{$t.summaryPerfect}</p>
    {:else}
      <p class="summary-text">
        {$t.summaryObjective}: <span class="number">{target}</span>
      </p>
      <p class="summary-text">
        {$t.summaryYourBest}: <span class="number">{closestNumber}</span>
      </p>
      <p class="subtitle">
        {@html $t.summaryDifference.replace('{difference}', difference.toString())}
      </p>
    {/if}

    {#if idealSolution}
      <div class="ideal-solution">
        <h3 class="solution-title">{$t.idealSolution}</h3>
        <p class="solution-text">{idealSolution}</p>
      </div>
    {/if}

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
        max-width: 650px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
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
    
    .summary-text {
        font-size: 1.5rem;
        color: #5d4037;
        margin: 1rem 0;
    }

    .number {
        font-weight: bold;
        color: #d2691e;
    }

    .difference {
        font-weight: bold;
        font-size: 1.8rem;
        color: #a0522d;
    }

    .ideal-solution {
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 2px dashed #a0522d;
    }

    .solution-title {
        font-size: 1.8rem;
        color: #5d4037;
        margin: 0 0 1rem 0;
    }

    .solution-text {
        font-family: 'monospace';
        font-size: 1.2rem;
        background-color: #fdf6e3;
        padding: 1rem;
        border-radius: 10px;
        color: #333;
        white-space: pre-wrap; 
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
        margin-top: 2rem;
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
            padding: 2rem 1.8rem;
            border-radius: 20px;
        }

        .title {
            font-size: 2.2rem;
        }

        .subtitle {
            font-size: 1.2rem;
            margin: 0.5rem 0 2rem 0;
        }

        .summary-text {
            font-size: 1.2rem;
        }

        .difference {
            font-size: 1.5rem;
        }

        .ideal-solution {
            margin-top: 1.5rem;
            padding-top: 1rem;
        }

        .solution-title {
            font-size: 1.5rem;
        }

        .solution-text {
            font-size: 1rem;
            padding: 0.8rem;
        }

        .play-again-btn {
            font-size: 1.3rem;
            padding: 0.6em 1.5em;
            margin-top: 1.5rem;
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
            font-size: 1.5rem;
            margin: 0.5rem 0 1.5rem 0;
        }

        .summary-text {
            font-size: 1.5rem;
        }

        .difference {
            font-size: 1.3rem;
        }

        .solution-title {
            font-size: 1.3rem;
        }

        .solution-text {
            font-size: 1.5rem;
            padding: 0.6rem;
        }

        .play-again-btn {
            font-size: 1.2rem;
        }
    }
</style>
