
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { numbers, target, generateNewRound } from './stores';
  import Board from './Board.svelte';
  import Cube from './Cube.svelte';
  import Basket from './Basket.svelte';
  import type Matter from 'matter-js';

  type Zone = { label: string; x: number; y: number; width: number; height: number; };

  let gameReady = false;
  let world: Matter.World | null = null;
  let zones: Zone[] = [];
  let boardComponent: Board; // Referencia al componente Board
  
  let basketsVisible = false;
  let basketTimer: number;

  function startNewRound() {
    basketsVisible = false;
    zones = [];
    world = null;
    
    generateNewRound();
    gameReady = true;

    basketTimer = window.setTimeout(() => {
      basketsVisible = true;
      // Al mismo tiempo que hacemos visible, activamos las físicas
      if (boardComponent) {
        boardComponent.activateBaskets();
      }
    }, 2500);
  }

  onMount(() => {
    startNewRound();
  });

  onDestroy(() => {
    clearTimeout(basketTimer);
  });

  function handleBoardReady(event: CustomEvent<{ world: Matter.World, zones: Zone[] }>) {
    world = event.detail.world;
    zones = event.detail.zones;
  }

</script>

<div class="game-container">
  <header>
    <h1>Cubos & Cestas</h1>
    <div class="target-display">Objetivo: <span>{$target}</span></div>
  </header>

  {#if gameReady}
    <!-- Vinculamos el componente a nuestra variable `boardComponent` -->
    <Board on:boardready={handleBoardReady} bind:this={boardComponent}>
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
    <button on:click={startNewRound}>Reset Total</button>
  </div>
</div>

<style>
  /* ... (estilos sin cambios) ... */
  .game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Patrick Hand', cursive;
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

  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: 3px 3px 6px rgba(0,0,0,0.2);
  }
</style>
