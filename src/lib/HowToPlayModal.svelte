
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { t } from './i18n';

  const dispatch = createEventDispatcher();
</script>

<div class="modal-backdrop" on:click={() => dispatch('close')} transition:fade={{ duration: 300 }}>
  <div class="modal-content" in:fly={{ y: -50, duration: 400 }} out:fly={{ y: -50, duration: 300 }} on:click|stopPropagation>
    <h2 class="title">{$t.howToPlayTitle}</h2>
    <div class="instructions">
        <p>{@html $t.howToPlayIntro}</p>
        
        <ol>
            <li>{@html $t.howToPlayStep1}</li>
            <li>{@html $t.howToPlayStep2}</li>
            <li>{@html $t.howToPlayStep3}</li>
            <li>{@html $t.howToPlayStep4}</li>
        </ol>

        <h3 class="rules-title">{$t.rulesTitle}</h3>
        <ul>
            <li>{@html $t.rulesSubtract}</li>
            <li>{@html $t.rulesDivide}</li>
        </ul>

        <p class="tip">{$t.tip}</p>
    </div>
    <button class="close-btn" on:click={() => dispatch('close')}>{$t.understood}</button>
  </div>
</div>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    padding: 0;
  }

  .modal-content {
    font-family: 'Patrick Hand', cursive;
    background-color: #fff9f0;
    padding: 2rem 3.5rem;
    border-radius: 25px;
    max-width: 600px;
    width: 90%;
    text-align: left;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    border: 5px solid #a0522d;
    color: #5d4037;
    max-height: 90vh;
    overflow-y: auto;
    margin: auto;
  }

  .title {
    font-size: 2.8rem;
    color: #d2691e;
    text-align: center;
    margin: 0 0 1.5rem 0;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  }

  .instructions {
      font-size: 1.25rem;
      line-height: 1.6;
  }

  .instructions strong {
      color: #a0522d;
  }
  
  .instructions ol, .instructions ul {
      padding-left: 2rem;
      margin: 1rem 0;
  }

  .instructions li {
      margin-bottom: 0.8rem;
  }

  .rules-title {
      font-size: 1.8rem;
      color: #8b4513;
      margin-top: 2rem;
      margin-bottom: 1rem;
      text-align: center;
      border-top: 2px dashed #cdbda1;
      padding-top: 1.5rem;
  }

  .tip {
      font-style: italic;
      text-align: center;
      margin-top: 2rem;
      color: #8b4513;
      background-color: #fdf6e3;
      padding: 1rem;
      border-radius: 10px;
  }

  .close-btn {
    display: block;
    margin: 2.5rem auto 0 auto;
    font-family: 'Patrick Hand', cursive;
    font-size: 1.5rem;
    padding: 0.6em 2em;
    background-color: #a0522d;
    color: white;
    border: none;
    border-radius: 15px;
    box-shadow: 0 6px 15px rgba(0,0,0,0.2);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .close-btn:hover {
    background-color: #5d4037;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.25);
  }

  @media (max-width: 768px) {
    .modal-content {
        width: 95%;
        padding: 1.5rem 1.5rem;
        max-height: 92vh;
        border-radius: 20px;
    }

    .title {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    .instructions {
        font-size: 1.05rem;
    }

    .instructions ol, .instructions ul {
        padding-left: 1.5rem;
    }

    .rules-title {
        font-size: 1.5rem;
        margin-top: 1.5rem;
        padding-top: 1rem;
    }

    .close-btn {
        font-size: 1.3rem;
        margin-top: 2rem;
        padding: 0.5em 1.8em;
    }
  }

  @media (max-width: 480px) {
    .modal-content {
        width: 96%;
        padding: 1.2rem 1rem;
        border-width: 3px;
        border-radius: 15px;
    }

    .title {
        font-size: 1.7rem;
    }

    .instructions {
        font-size: 0.95rem;
        line-height: 1.5;
    }

    .instructions ol, .instructions ul {
        padding-left: 1rem;
    }

    .instructions li {
        margin-bottom: 0.5rem;
    }

    .rules-title {
        font-size: 1.3rem;
    }

    .tip {
        font-size: 0.9rem;
        padding: 0.7rem;
        margin-top: 1.3rem;
    }

    .close-btn {
        font-size: 1.1rem;
        padding: 0.5em 1.5em;
        margin-top: 1.5rem;
    }
  }
</style>
