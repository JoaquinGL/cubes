
<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { get } from 'svelte/store';
  import { numbers, initialNumbers, target, generateNewRound, removeNumbers, addNumber, resetRound } from './stores';
  import { findBestSolution, formatExpression } from './solver';
  import Board from './Board.svelte';
  import Cube from './Cube.svelte';
  import Basket from './Basket.svelte';
  import Victory from './Victory.svelte';
  import Summary from './Summary.svelte';
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
  let showSummary = false;
  let closestNumber = 0;
  let idealSolution: string | null = null;

  const unsubscribe = numbers.subscribe(currentNumbers => {
    if (get(target) && currentNumbers.some(n => n.value === get(target))) {
      showVictory = true;
    }
  });

  function initializeRound() {
    showVictory = false;
    showSummary = false;
    idealSolution = null;
    basketsVisible = false;
    generateNewRound(largeNumbers);
    gameReady = true;

    // Clear any existing timer before setting a new one
    clearTimeout(basketTimer);
    basketTimer = window.setTimeout(() => {
      basketsVisible = true;
    }, 2500);
  }

  function handleReset() {
    clearTimeout(basketTimer); // Ensure no lingering timers
    basketsVisible = false;
    resetRound();

    // Re-show baskets after a delay, simulating the start of the game
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

  function handleFinish() {
    const currentNumbersValues = get(numbers).map(n => n.value);
    const currentTarget = get(target);
    if (currentTarget === null) return;

    closestNumber = currentNumbersValues.reduce((prev, curr) => 
      Math.abs(curr - currentTarget) < Math.abs(prev - currentTarget) ? curr : prev, 
      currentNumbersValues[0] || 0
    );

    const initialNumsForSolver = get(initialNumbers).map(n => n.value);
    const solution = findBestSolution(initialNumsForSolver, currentTarget);
    idealSolution = solution ? `${formatExpression(solution.expression)} = ${solution.value}` : 'No se encontró una solución.';

    showSummary = true;
  }

  function handleBoardReady(event: CustomEvent<{ world: Matter.World, zones: Zone[] }>) {
    world = event.detail.world;
    zones = event.detail.zones;
  }
  
  function handleOperation(event: CustomEvent<{ bodyA: Matter.Body, bodyB: Matter.Body, operation: string }>) {
    const { bodyA, bodyB, operation } = event.detail;
    
    const idA = parseInt(bodyA.label.split('-')[1]);
    const idB = parseInt(bodyB.label.split('-')[1]);

    const numA = get(numbers).find(n => n.id === idA);
    const numB = get(numbers).find(n => n.id === idB);

    if (!numA || !numB) return;

    let result: number | null = null;
    const valA = numA.value;
    const valB = numB.value;

    switch (operation) {
      case 'suma': result = valA + valB; break;
      case 'resta': result = Math.max(valA, valB) - Math.min(valA, valB); break;
      case 'multiplicacion': result = valA * valB; break;
      case 'division':
        const maxVal = Math.max(valA, valB), minVal = Math.min(valA, valB);
        if (minVal !== 0 && maxVal % minVal === 0) result = maxVal / minVal;
        break;
    }

    if (result === null) return;
    
    const targetZone = zones.find(z => z.label === operation);
    if (!targetZone) return; 

    removeNumbers([numA.id, numB.id]);
    addNumber(result, targetZone.x, targetZone.y);
  }

</script>

<main class="game-container">
  {#if showVictory}
    <Victory on:playAgain={initializeRound} on:newSelection={goBackToSelection} />
  {:else if showSummary}
    <Summary target={$target} {closestNumber} {idealSolution} on:playAgain={initializeRound} on:newSelection={goBackToSelection} />
  {/if}

  <header>
    <h1>El Desafío Aritmético</h1>
    <div class="target-display">Objetivo: <span>{$target}</span></div>
  </header>

  {#if gameReady}
    <Board on:boardready={handleBoardReady} on:operation={handleOperation} basketsVisible={basketsVisible}>
      {#if world && zones.length > 0}
        {#if basketsVisible}
          {#each zones as zone (zone.label)} <Basket {...zone} /> {/each}
        {/if}
        {#each $numbers as num (num.id)}
          <Cube id={num.id} number={num.value} world={world} x={num.x} y={num.y} />
        {/each}
      {/if}
    </Board>
  {/if}

  <div class="controls">
     <button on:click={handleReset}>Reiniciar</button>
     <button on:click={handleFinish}>Finalizar</button>
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
    min-height: 100vh;
    box-sizing: border-box;
    position: relative;
  }

  @media (max-width: 768px) {
    .game-container {
        padding-top: 0.5rem;
    }
  }

  @media (max-width: 480px) {
    .game-container {
        padding-top: 0.3rem;
    }
  }
  header {
      text-align: center;
      margin-bottom: 1rem;
      padding: 0 1rem;
  }
  header h1 { font-size: 2.5rem; color: #5d4037; margin: 0; line-height: 1.2; }
  .target-display { font-size: 1.8rem; color: #8b4513; margin-top: 0.5rem; }
  .target-display span { font-weight: bold; color: #d2691e; text-shadow: 1px 1px 2px rgba(0,0,0,0.1); }
  .controls {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    display: flex;
    gap: 1rem;
    width: 100%;
    justify-content: center;
    padding: 0 1rem;
    box-sizing: border-box;
  }
  .controls button {
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
  .controls button:hover {
    background-color: #a0522d;
    transform: translateY(-2px);
    box-shadow: 5px 5px 10px rgba(0,0,0,0.3);
  }

  @media (max-width: 768px) {
    header {
        margin-bottom: 0.8rem;
        padding: 0 0.5rem;
    }
    header h1 {
        font-size: 2rem;
        margin: 0.5rem 0;
    }
    .target-display {
        font-size: 1.6rem;
        margin-top: 0.3rem;
    }
    .controls {
        flex-direction: column;
        align-items: center;
        gap: 0.8rem;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }
    .controls button {
        width: 100%;
        max-width: 400px;
        font-size: 1.1rem;
        padding: 0.8em 1.2em;
    }
  }

  @media (max-width: 480px) {
    header {
        margin-bottom: 0.6rem;
    }
    header h1 {
        font-size: 1.8rem;
        margin: 0.4rem 0;
    }
    .target-display {
        font-size: 1.4rem;
        margin-top: 0.25rem;
    }
    .controls {
        margin-top: 0.8rem;
        margin-bottom: 0.4rem;
        gap: 0.6rem;
    }
    .controls button {
        font-size: 1rem;
        padding: 0.6em 1em;
    }
  }
</style>
