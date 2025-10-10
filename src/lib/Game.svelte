
<script lang="ts">
  import { onMount } from 'svelte';
  import { numbers, generateNewRound } from './stores';
  import Board from './Board.svelte';
  import Cube from './Cube.svelte';
  import type Matter from 'matter-js';

  let gameReady = false;
  let world: Matter.World | null = null;

  onMount(() => {
    generateNewRound();
    gameReady = true;
  });

  function handleBoardReady(event: CustomEvent<{ world: Matter.World }>) {
    world = event.detail.world;
  }

</script>

<div class="game-container">
  <header>
    <h1>Cubos & Cestas (Modo Depuración)</h1>
  </header>

  {#if gameReady}
    <Board on:boardready={handleBoardReady}>
      {#if world}
        {#each $numbers as num (num.id)}
          <Cube id={num.id} number={num.value} world={world} />
        {/each}
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

  header h1 {
    font-size: 2.5rem;
    color: #5d4037;
  }
</style>
