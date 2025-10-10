
<script lang="ts">
  import { onMount } from 'svelte';
  import { numbers, target, generateNewRound } from './stores';
  import Board from './Board.svelte';
  import Cube from './Cube.svelte';
  import Basket from './Basket.svelte';
  import { fade } from 'svelte/transition';
  import type Matter from 'matter-js';

  let gameReady = false;
  let showBaskets = false;
  let world: Matter.World | null = null;
  let boardWidth = 0;
  let boardHeight = 0;

  let basketStates = new Map<number, { count: number }>();

  onMount(() => {
    generateNewRound();
    gameReady = true;

    // Retrasamos la aparición de las cestas
    setTimeout(() => {
      showBaskets = true;
    }, 1500);
  });

  function handleBoardReady(event: CustomEvent<{ world: Matter.World; width: number; height: number }>) {
    world = event.detail.world;
    boardWidth = event.detail.width;
    boardHeight = event.detail.height;
  }

  function handleBasketUpdate(event: CustomEvent<{ basketId: number, count: number }>) {
      basketStates.set(event.detail.basketId, { count: event.detail.count });
      basketStates = basketStates; // Forzamos la reactividad
  }

</script>

<div class="game-container">
  <header>
    <h1>Cubos & Cestas</h1>
    <div class="target-display">Objetivo: <span>{$target}</span></div>
  </header>

  {#if gameReady}
    <Board on:boardready={handleBoardReady} on:basketupdate={handleBasketUpdate}>
      {#if world && boardWidth > 0}
        <!-- Cubos -->
        {#each $numbers as num (num.id)}
          <Cube id={num.id} number={num.value} world={world} x={num.x} y={num.y} />
        {/each}

        <!-- Cestas de Operaciones -->
        {#if showBaskets}
            <div in:fade={{ duration: 500 }}>
                <Basket id={1} operation="add" x={boardWidth * 1 / 5} y={boardHeight / 2} cubesInside={basketStates.get(1)?.count ?? 0} />
            </div>
            <div in:fade={{ duration: 500, delay: 200 }}>
                <Basket id={2} operation="subtract" x={boardWidth * 2 / 5} y={boardHeight / 2} cubesInside={basketStates.get(2)?.count ?? 0} />
            </div>
            <div in:fade={{ duration: 500, delay: 400 }}>
                <Basket id={3} operation="multiply" x={boardWidth * 3 / 5} y={boardHeight / 2} cubesInside={basketStates.get(3)?.count ?? 0} />
            </div>
            <div in:fade={{ duration: 500, delay: 600 }}>
                <Basket id={4} operation="divide" x={boardWidth * 4 / 5} y={boardHeight / 2} cubesInside={basketStates.get(4)?.count ?? 0} />
            </div>
        {/if}

      {/if}
    </Board>
  {/if}
</div>

<style>
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

  header h1 {
    font-size: 2.5rem;
    color: #5d4037;
    margin: 0;
  }

  .target-display {
      font-size: 1.8rem;
      color: #8b4513;
      margin-top: 0.5rem;
  }

  .target-display span {
      font-weight: bold;
      color: #d2691e;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  }
</style>
