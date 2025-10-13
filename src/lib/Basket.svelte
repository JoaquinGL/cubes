
<script lang="ts">
    export let x: number;
    export let y: number;
    export let width: number;
    export let height: number;
    export let label: string;

    // Mapa para traducir etiquetas a símbolos
    const symbols: { [key: string]: string } = {
        suma: '+',
        resta: '-',
        multiplicar: '×',
        dividir: '÷',
    };

</script>

<div 
  class="basket-zone"
  style="left: {x - width/2}px; top: {y - height/2}px; width: {width}px; height: {height}px;"
>
    <!-- Mostramos el símbolo correspondiente -->
    <span class="label">{symbols[label] || ''}</span>
</div>

<style>
  .basket-zone {
    position: absolute;
    border: 3px dashed #cdbda1;
    border-radius: 15px;
    background-color: rgba(239, 227, 201, 0.5);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease-in-out;
  }

  .label {
      font-family: monospace; /* Fuente más adecuada para símbolos matemáticos */
      font-size: 3rem; /* Símbolo más grande y claro */
      font-weight: bold;
      color: #a0522d;
      opacity: 0.8;
      /* Centrado vertical del símbolo, que a veces se desalinea */
      line-height: 1;
      padding-bottom: 5px;
  }
</style>
