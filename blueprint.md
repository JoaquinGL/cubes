
# Blueprint: El Desafío Aritmético

## Visión General

"El Desafío Aritmético" es un juego web interactivo inspirado en el clásico concurso de "Cifras y Letras". El objetivo es utilizar seis números iniciales (elegidos por el usuario) y las operaciones aritméticas básicas (suma, resta, multiplicación y división) para alcanzar un número objetivo generado aleatoriamente.

El juego está construido con Svelte y TypeScript, utilizando Matter.js para crear una experiencia de "caja de arena" física donde los números, representados como cubos, pueden ser arrastrados y soltados en "cestas" de operaciones para realizar los cálculos.

## Características Implementadas

- **Selección de Números:** El jugador puede elegir cuántos "números grandes" (25, 50, 75, 100) desea incluir en su selección de seis números, desde 0 hasta 4.
- **Generación de la Partida:**
  - Se generan 6 números iniciales según la elección del jugador.
  - Se genera un número objetivo aleatorio entre 101 y 999.
- **Interfaz Física Interactiva:**
  - Los números aparecen como cubos físicos en un tablero.
  - El jugador puede arrastrar los cubos.
  - Aparecen "cestas" para cada operación aritmética (suma, resta, multiplicación, división) donde el jugador puede soltar los cubos.
- **Mecánica de Juego:**
  - Al soltar dos números en una cesta, se realiza la operación correspondiente.
  - Los dos números originales desaparecen y un nuevo cubo con el resultado aparece en el lugar de la operación.
  - La división solo es válida si es exacta y con números enteros.
  - La resta siempre da como resultado un número positivo (el mayor menos el menor).
- **Condición de Victoria:** El juego se gana si el jugador consigue generar un número exactamente igual al objetivo.
- **Pantalla de Victoria:** Aparece una pantalla de felicitación al alcanzar el objetivo.
- **Controles de la Partida:**
  - **Reiniciar:** Permite volver a empezar la ronda actual con los mismos números y objetivo.
  - **Finalizar:** Termina la partida y muestra una pantalla de resumen.
  - **Nueva Selección:** Vuelve a la pantalla inicial para elegir un nuevo conjunto de números.
- **Pantalla de Resumen (Fin de Partida):**
  - Muestra el número objetivo, el número más cercano que ha conseguido el jugador y a qué distancia se ha quedado.
  - **Solucionador Ideal:** Muestra la secuencia de operaciones exacta para alcanzar el objetivo (o el resultado más cercano posible si el objetivo no era alcanzable), sirviendo como un "desafío a la máquina".
- **Inicio Rápido (Random Total):** En la pantalla de selección, un botón "Random Total" permite iniciar el juego inmediatamente con una cantidad aleatoria de números grandes.

## Estilo y Diseño

- **Estética:** El juego tiene un diseño amigable y táctil, con una paleta de colores cálidos (marrones, naranjas, beiges) que recuerda a la madera y el papel.
- **Tipografía:** Se utiliza la fuente "Patrick Hand" para dar un toque informal y manuscrito.
- **Animaciones:** Se emplean transiciones suaves (`fly` de Svelte) para la aparición de las pantallas modales (Victoria y Resumen), mejorando la experiencia de usuario.
- **Interactividad:** Los botones y elementos interactivos tienen efectos `hover` y `shadows` que les dan profundidad y responden a la acción del usuario.

## Plan para el Cambio Actual: Añadir "Random Total"

1.  **[HECHO]** Analizar el componente `App.svelte` para entender el flujo de estados del juego.
2.  **[HECHO]** Analizar el componente `NumberSelection.svelte` para identificar cómo se gestiona la selección del usuario y el inicio del juego.
3.  **[HECHO]** **Modificar `NumberSelection.svelte`:**
    -   Añadir un nuevo botón "Random Total".
    -   Crear una función `startRandom` que genere un número aleatorio de 0 a 4.
    -   Esta función despachará el evento `start` con el número aleatorio, iniciando el juego inmediatamente.
    -   Ajustar los estilos CSS para acomodar el nuevo botón y mantener la coherencia visual.
4.  **[HECHO]** **Actualizar `blueprint.md`:** Documentar la nueva característica de "Random Total" en la lista de funcionalidades implementadas.
