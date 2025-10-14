
# Blueprint: El Desafío Aritmético

## Visión General

"El Desafío Aritmético" es un juego web interactivo inspirado en el clásico concurso de "Cifras y Letras". El objetivo es utilizar seis números iniciales (elegidos por el usuario) y las operaciones aritméticas básicas (suma, resta, multiplicación y división) para alcanzar un número objetivo generado aleatoriamente.

El juego está construido con Svelte y TypeScript, utilizando Matter.js para crear una experiencia de "caja de arena" física donde los números, representados como cubos, pueden ser arrastrados y soltados en "cestas" de operaciones para realizar los cálculos.

## Características Implementadas

- **Guía de Juego:** Una ventana modal de "Cómo se Juega" explica las reglas y la mecánica a los nuevos jugadores. Está accesible desde la pantalla de inicio.
- **Selección de Números:** El jugador puede elegir cuántos "números grandes" (25, 50, 75, 100) desea incluir en su selección de seis números, desde 0 hasta 4.
- **Inicio Rápido (Random Total):** En la pantalla de selección, un botón "Random Total" permite iniciar el juego inmediatamente con una cantidad aleatoria de números grandes.
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

## Estilo y Diseño

- **Estética:** El juego tiene un diseño amigable y táctil, con una paleta de colores cálidos (marrones, naranjas, beiges) que recuerda a la madera y el papel.
- **Tipografía:** Se utiliza la fuente "Patrick Hand" para dar un toque informal y manuscrito.
- **Diseño Adaptable (Responsive):** La aplicación está optimizada para dispositivos móviles. Las ventanas modales, como la de "Cómo se Juega", incluyen barras de desplazamiento vertical (`scroll`) si el contenido excede la altura de la pantalla, garantizando una buena experiencia en cualquier tamaño de dispositivo.
- **Animaciones:** Se emplean transiciones suaves (`fly`, `fade` de Svelte) para la aparición de las pantallas modales, mejorando la experiencia de usuario.
- **Interactividad:** Los botones y elementos interactivos tienen efectos `hover` y `shadows` que les dan profundidad y responden a la acción del usuario.

