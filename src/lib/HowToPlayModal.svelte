
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly, fade } from 'svelte/transition';

  const dispatch = createEventDispatcher();
</script>

<div class="modal-backdrop" on:click={() => dispatch('close')} transition:fade={{ duration: 300 }}>
  <div class="modal-content" in:fly={{ y: -50, duration: 400 }} out:fly={{ y: -50, duration: 300 }} on:click|stopPropagation>
    <h2 class="title">¿Cómo se Juega?</h2>
    <div class="instructions">
        <p>El objetivo es simple: <strong>alcanzar el número objetivo</strong> que aparece en la parte superior de la pantalla.</p>
        
        <ol>
            <li>Tienes <strong>seis números iniciales</strong> en cubos de madera.</li>
            <li>Arrastra dos cubos y suéltalos dentro de una de las <strong>cuatro cestas de operaciones</strong> (suma, resta, multiplicación o división) que aparecerán.</li>
            <li>Al hacerlo, los dos números originales desaparecerán y aparecerá un <strong>nuevo cubo con el resultado</strong>.</li>
            <li>Puedes usar los nuevos resultados en cálculos posteriores.</li>
        </ol>

        <h3 class="rules-title">Reglas de las Operaciones</h3>
        <ul>
            <li><strong>Resta:</strong> Siempre se resta el número menor al mayor, el resultado nunca es negativo.</li>
            <li><strong>División:</strong> Solo es válida si el resultado es un número entero (por ejemplo, 10 / 2 es válido, pero 10 / 3 no).</li>
        </ul>

        <p class="tip">No tienes que usar los seis números. ¡Intenta llegar al objetivo de la forma que puedas!</p>
    </div>
    <button class="close-btn" on:click={() => dispatch('close')}>¡Entendido!</button>
  </div>
</div>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    padding: 1rem;
    box-sizing: border-box;
  }

  .modal-content {
    font-family: 'Patrick Hand', cursive;
    background-color: #fff9f0;
    padding: 2rem 3.5rem;
    border-radius: 25px;
    max-width: 600px;
    width: 100%;
    text-align: left;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    border: 5px solid #a0522d;
    color: #5d4037;
    max-height: 85vh;
    overflow-y: auto;
  }

  .title {
    font-size: 2.8rem;
    color: #d2691e;
    text-align: center;
    margin: 0 0 1.5rem 0;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  }

  .instructions {
      font-size: 1.25rem;
      line-height: 1.6;
  }

  .instructions strong {
      color: #a0522d;
  }
  
  .instructions ol, .instructions ul {
      padding-left: 2rem;
      margin: 1rem 0;
  }

  .instructions li {
      margin-bottom: 0.8rem;
  }

  .rules-title {
      font-size: 1.8rem;
      color: #8b4513;
      margin-top: 2rem;
      margin-bottom: 1rem;
      text-align: center;
      border-top: 2px dashed #cdbda1;
      padding-top: 1.5rem;
  }

  .tip {
      font-style: italic;
      text-align: center;
      margin-top: 2rem;
      color: #8b4513;
      background-color: #fdf6e3;
      padding: 1rem;
      border-radius: 10px;
  }

  .close-btn {
    display: block;
    margin: 2.5rem auto 0 auto;
    font-family: 'Patrick Hand', cursive;
    font-size: 1.5rem;
    padding: 0.6em 2em;
    background-color: #a0522d;
    color: white;
    border: none;
    border-radius: 15px;
    box-shadow: 0 6px 15px rgba(0,0,0,0.2);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .close-btn:hover {
    background-color: #5d4037;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.25);
  }

  @media (max-width: 768px) {
    .modal-content {
        padding: 1.5rem 2rem;
        max-height: 90vh;
    }

    .title {
        font-size: 2.2rem;
        margin-bottom: 1rem;
    }

    .instructions {
        font-size: 1.1rem;
    }

    .instructions ol, .instructions ul {
        padding-left: 1.5rem;
    }

    .rules-title {
        font-size: 1.5rem;
        margin-top: 1.5rem;
        padding-top: 1rem;
    }

    .close-btn {
        font-size: 1.3rem;
        margin-top: 2rem;
        padding: 0.5em 1.8em;
    }
  }

  @media (max-width: 480px) {
    .modal-content {
        padding: 1rem 1.2rem;
        border-width: 3px;
    }

    .title {
        font-size: 1.8rem;
    }

    .instructions {
        font-size: 1rem;
        line-height: 1.5;
    }

    .instructions ol, .instructions ul {
        padding-left: 1.2rem;
    }

    .instructions li {
        margin-bottom: 0.6rem;
    }

    .rules-title {
        font-size: 1.3rem;
    }

    .tip {
        font-size: 0.95rem;
        padding: 0.8rem;
        margin-top: 1.5rem;
    }

    .close-btn {
        font-size: 1.2rem;
        padding: 0.5em 1.5em;
        margin-top: 1.5rem;
    }
  }
</style>
