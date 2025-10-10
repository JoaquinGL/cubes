
<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import Matter from 'matter-js';

  export let id: number;
  export let x: number;
  export let y: number;
  export let width: number = 180;
  export let height: number = 120;
  export let operation: 'add' | 'subtract' | 'multiply' | 'divide' = 'add';
  export let cubesInside: number = 0;

  const dispatch = createEventDispatcher();

  onMount(() => {
    const { Bodies } = Matter;
    const basketBody = Bodies.rectangle(x, y, width, height, {
      isStatic: true,
      isSensor: true,
      label: 'Basket Body',
      render: { visible: false }
    });

    (basketBody as any).operation = operation;
    basketBody.id = id; // Asignamos el ID al cuerpo

    dispatch('basketcreated', { body: basketBody });
  });

  const operationSymbols = {
      add: '+',
      subtract: '−',
      multiply: '×',
      divide: '÷'
  }

</script>

<div class="basket-container" class:active={cubesInside > 0} style="left: {x - width / 2}px; top: {y - height / 2}px; width: {width}px; height: {height}px;">
  <div class="basket-label">{operationSymbols[operation]}</div>
</div>

<style>
  .basket-container {
    position: absolute;
    background-color: rgba(160, 82, 45, 0.05);
    border: 3px dashed #a0522d;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }

  .basket-container.active {
    background-color: rgba(139, 69, 19, 0.2);
    border-color: #8b4513;
  }

  .basket-label {
    font-size: 4em;
    font-weight: bold;
    color: #a0522d;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }

  .basket-container.active .basket-label {
      opacity: 0.8;
  }
</style>
