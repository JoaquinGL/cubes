
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly, scale } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  function playAgain() {
    dispatch('playagain');
  }
</script>

<div class="overlay" in:fly={{ y: -200, duration: 500, delay: 200 }}>
  <div class="victory-modal" in:scale={{ duration: 400, delay: 500, start: 0.5 }}>
    <h2>¡Victoria!</h2>
    <p>¡Has alcanzado el número objetivo!</p>
    <button on:click={playAgain}>Jugar de Nuevo</button>
  </div>
</div>

<style>
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .victory-modal {
    background-color: #fdf6e3;
    padding: 2.5rem 3rem;
    border-radius: 25px;
    border: 10px solid #d2b48c;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    color: #5d4037;
  }

  h2 {
    font-family: 'Patrick Hand', cursive;
    font-size: 3.5rem;
    color: #d2691e;
    margin: 0 0 1rem 0;
    text-shadow: 2px 2px 3px rgba(0,0,0,0.1);
  }

  p {
    font-size: 1.5rem;
    margin: 0 0 2rem 0;
  }

  button {
    font-family: 'Patrick Hand', cursive;
    font-size: 1.5rem;
    padding: 0.8rem 2rem;
    border-radius: 15px;
    border: 3px solid #8b4513;
    background-color: #d2691e;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  }

  button:hover {
    transform: translateY(-3px);
    background-color: #a0522d;
    box-shadow: 0 6px 15px rgba(0,0,0,0.3);
  }
</style>
