
<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { get } from 'svelte/store';
  import { numbers, target, generateNewRound, removeNumbers, addNumber } from './stores';
  import Board from './Board.svelte';
  import Cube from './Cube.svelte';
  import Basket from './Basket.svelte';
  import Victory from './Victory.svelte';
  import type Matter from 'matter-js';

  export let largeNumbers: number;
  const dispatch = createEventDispatcher();

  type Zone = { label: string; x: number; y: number; width: number; height: number; };

  let gameReady = false;
  let world: Matter.World | null = null;
  let zones: Zone[] = [];
  
  let basketsVisible = false;
  let basketTimer: number;
  let showVictory = false;

  const unsubscribe = numbers.subscribe(currentNumbers => {
    if (get(target) && currentNumbers.some(n => n.value === get(target))) {
      showVictory = true;
    }
  });

  function initializeRound() {
    showVictory = false;
    basketsVisible = false;
    generateNewRound(largeNumbers);
    gameReady = true;

    basketTimer = window.setTimeout(() => {
      basketsVisible = true;
    }, 2500);
  }

  onMount(() => { initializeRound(); });
  onDestroy(() => {
    clearTimeout(basketTimer);
    unsubscribe();
  });

  function goBackToSelection() { dispatch('end'); }

  function handleBoardReady(event: CustomEvent<{ world: Matter.World, zones: Zone[] }>) {
    world = event.detail.world;
    zones = event.detail.zones;
  }
  
  function handleOperation(event: CustomEvent<{ bodyA: Matter.Body, bodyB: Matter.Body, operation: string, boardWidth: number }>) {
    const { bodyA, bodyB, operation, boardWidth } = event.detail;
    if (operation !== 'suma') return;

    const idA = parseInt(bodyA.label.split('-')[1]);
    const idB = parseInt(bodyB.label.split('-')[1]);

    const numA = get(numbers).find(n => n.id === idA);
    const numB = get(numbers).find(n => n.id === idB);

    if (!numA || !numB) return;

    const result = numA.value + numB.value;
    
    if (boardWidth === 0) return;

    const dropX = boardWidth / 2;
    // REVERTIDO: Volvemos a la posición de caída original y estable.
    const dropY = 50;

    removeNumbers([numA.id, numB.id]);
    addNumber(result, dropX, dropY);
  }

</script>

<main class="game-container">
  {#if showVictory}
    <Victory on:playAgain={goBackToSelection} />
  {/if}

  <header>
    <h1>El Desafío Aritmético</h1>
    <div class="target-display">Objetivo: <span>{$target}</span></div>
  </header>

  {#if gameReady}
    <Board on:boardready={handleBoardReady} on:operation={handleOperation} basketsVisible={basketsVisible}>
      {#if world && zones.length > 0}
        {#if basketsVisible}
          {#each zones as zone (zone.label)}
            <Basket {...zone} />
          {/each}
        {/if}
        {#each $numbers as num (num.id)}
          <Cube id={num.id} number={num.value} world={world} x={num.x} y={num.y} />
        {/each}
      {/if}
    </Board>
  {/if}

  <div class="controls">
    <button on:click={goBackToSelection}>Nueva Selección</button>
  </div>
</main>

<style>
  .game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Patrick Hand', cursive;
    padding-top: 1rem;
    background-color: #fdf6e3;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    position: relative;
  }
  header {
      text-align: center;
      margin-bottom: 1rem;
  }
  header h1 { font-size: 2.5rem; color: #5d4037; margin: 0; }
  .target-display { font-size: 1.8rem; color: #8b4513; margin-top: 0.5rem; }
  .target-display span { font-weight: bold; color: #d2691e; text-shadow: 1px 1px 2px rgba(0,0,0,0.1); }
  .controls {
    margin-top: 1.5rem;
    display: flex;
    gap: 1rem;
  }
  button {
    font-family: 'Patrick Hand', cursive;
    font-size: 1.2rem;
    padding: 0.5em 1.2em;
    background-color: #d2691e;
    color: white;
    border: none;
    border-radius: 10px;
    box-shadow: 3px 3px 6px rgba(0,0,0,0.2);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  button:hover {
    background-color: #a0522d;
    transform: translateY(-2px);
    box-shadow: 5px 5px 10px rgba(0,0,0,0.3);
  }
</style>
