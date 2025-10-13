
<script lang="ts">
  export let label: string;
  export let x: number;
  export let y: number;
  export let width: number;
  export let height: number;

  const symbols: { [key: string]: string } = {
    suma: '+',
    resta: '-',
    multiplicacion: '×',
    division: '÷'
  };

  const symbol = symbols[label] || '?';
</script>

<div class="basket" style="left: {x - width / 2}px; top: {y - height / 2}px; width: {width}px; height: {height}px;">
  <div class="symbol">{symbol}</div>
</div>

<style>
  .basket {
    position: absolute;
    border: 4px dashed #a0522d;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(210, 105, 30, 0.05);
  }

  .symbol {
    font-family: 'Patrick Hand', cursive;
    font-size: 4rem;
    color: rgba(139, 69, 19, 0.3);
    font-weight: bold;
    user-select: none;
  }
</style>
