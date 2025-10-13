
<script lang="ts">
  import NumberSelection from './lib/NumberSelection.svelte';
  import Game from './lib/Game.svelte';

  // "selection" o "game"
  let gameState: 'selection' | 'game' = 'selection';
  let largeNumbersCount = 0;

  function handleStartGame(event: CustomEvent<{ largeNumbers: number }>) {
    largeNumbersCount = event.detail.largeNumbers;
    gameState = 'game';
  }

  function handleEndGame() {
    gameState = 'selection';
  }

</script>

<main>
  {#if gameState === 'selection'}
    <NumberSelection on:start={handleStartGame} />
  {:else}
    <!-- Pasamos el conteo al juego y escuchamos cuando terminar -->
    <Game largeNumbers={largeNumbersCount} on:end={handleEndGame} />
  {/if}
</main>

<style>
  main {
    width: 100%;
    height: 100%;
  }
</style>
