
# Blueprint: Cubos & Cestas - Juego de Aritmética con Físicas

## Visión General

`Cubos & Cestas` es un juego web interactivo diseñado para agudizar las habilidades de cálculo mental de una manera lúdica y atractiva. Los jugadores combinan cubos numerados usando operaciones aritméticas básicas para alcanzar un número objetivo. La aplicación destaca por su motor de físicas (`Matter.js`), que permite una interacción táctil y dinámica con los elementos del juego.

El proyecto está construido con **Svelte** y **TypeScript**, aprovechando la reactividad y eficiencia de Svelte para crear una experiencia de usuario fluida y declarativa.

---

## Esquema del Proyecto y Características

### 1. Estructura de Componentes

- **`App.svelte`**: Componente raíz.
- **`Game.svelte`**: Orquesta el estado del juego y la UI.
- **`Board.svelte`**: Gestiona el motor `Matter.js` y toda la lógica de interacción.
- **`Cube.svelte`**: Representa un cubo numerado y arrastrable.
- **`Basket.svelte`**: Representa una cesta de operaciones.
- **`Victory.svelte`**: Modal de victoria que aparece al completar el objetivo.

### 2. Lógica y Estado (Stores)

- **`numbers`**: Almacena los cubos activos.
- **`target`**: Almacena el número objetivo de la ronda.
- **`generateNewRound`**: Función para generar un nuevo puzle.

### 3. Mecánica de Juego y Físicas

- **Motor de Físicas**: Basado en `Matter.js` para una simulación realista.
- **Interacción de Arrastre**: Los jugadores pueden arrastrar y soltar cubos.

- **Mecánica de Cestas "Pegajosas" (Sticky Baskets)**:
    - **Posicionamiento y Aparición**: Las cestas aparecen en el centro del tablero con una animación después de que los cubos iniciales se asienten.
    - **Captura de Cubos (Sticking)**: Al soltar un cubo en una cesta vacía, este se queda "pegado".
    - **Liberación de Cubos (Unsticking)**: Al volver a arrastrar un cubo pegado, este se libera.
    - **Lógica de Operación**: La operación aritmética se ejecuta cuando se suelta un segundo cubo en una cesta que ya contiene uno.
    - **Creación de Resultado**: Tras una operación, los dos cubos se eliminan y se crea un nuevo cubo con el resultado.

- **Condición de Victoria y Bucle de Juego (¡Implementado!)**:
    - **Detección de Victoria**: El juego detecta si un cubo resultante de una operación coincide con el número objetivo.
    - **Pantalla de Victoria**: Al ganar, se muestra un modal de celebración con animaciones.
    - **Jugar de Nuevo**: El jugador puede iniciar una nueva ronda directamente desde la pantalla de victoria, creando un bucle de juego completo.

### 4. Flujo de Juego Completo

1.  El usuario ve un número objetivo y varios cubos que caen en el tablero.
2.  Las cestas de operaciones aparecen en el centro.
3.  El usuario arrastra un cubo a una cesta, donde se queda pegado.
4.  El usuario arrastra un segundo cubo a la misma cesta, ejecutando la operación.
5.  Se genera un nuevo cubo con el resultado.
6.  El jugador repite el proceso hasta que el valor de un cubo resultante es igual al objetivo.
7.  **¡Victoria!** Se muestra la pantalla de victoria, desde donde se puede reiniciar la partida.

---

## Estado del Proyecto: ¡Completado!

**¡FUNCIONALIDAD PRINCIPAL COMPLETADA!**

El bucle de juego está finalizado. El jugador puede empezar una partida, jugar hasta ganar y reiniciar. Hemos implementado con éxito una mecánica de juego interactiva y única.

### Ideas para Futuras Mejoras (Opcional)

-   **Efectos de Sonido**: Añadir sonidos para la colisión de cubos, operaciones y victoria para una experiencia más inmersiva.
-   **Animaciones Adicionales**: Pulir las animaciones, como la desaparición de los cubos.
-   **Niveles de Dificultad**: Introducir diferentes niveles que ajusten la complejidad de los números.
-   **Puntuación o Temporizador**: Añadir un sistema de puntuación para un mayor desafío competitivo.
