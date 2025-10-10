
# Blueprint: Cubos & Cestas - Juego de Aritmética con Físicas

## Visión General

`Cubos & Cestas` es un juego web interactivo diseñado para agudizar las habilidades de cálculo mental de una manera lúdica y atractiva. Los jugadores combinan cubos numerados usando operaciones aritméticas básicas para alcanzar un número objetivo. La aplicación destaca por su motor de físicas (`Matter.js`), que permite una interacción táctil y dinámica con los elementos del juego.

El proyecto está construido con **Svelte** y **TypeScript**, aprovechando la reactividad y eficiencia de Svelte para crear una experiencia de usuario fluida y declarativa.

---

## Esquema del Proyecto y Características

### 1. Estructura de Componentes

- **`App.svelte`**: Componente raíz.
- **`Game.svelte`**: Orquesta el estado del juego, la UI principal (como el objetivo) y la comunicación entre componentes.
- **`Board.svelte`**: Gestiona el motor `Matter.js`, las interacciones físicas y la lógica de las cestas.
- **`Cube.svelte`**: Representa un cubo numerado y arrastrable, con animaciones y posicionamiento configurable.
- **`Basket.svelte`**: Representa una cesta para operaciones aritméticas, con estados visuales.

### 2. Lógica y Estado (Stores)

- **`numbers`**: Almacena los cubos activos, incluyendo sus posiciones de aparición opcionales.
- **`target`**: Almacena el número objetivo de la ronda.
- **`addNumber`, `removeNumber`**: Acciones para manipular la lista de cubos de forma reactiva.

### 3. Mecánica de Juego y Físicas

- **Motor de Físicas**: Basado en `Matter.js` para una simulación realista.
- **Interacción de Arrastre**: Los jugadores pueden arrastrar y soltar cubos. Se gestiona el `z-index` para que el cubo arrastrado siempre esté al frente.
- **Límites Físicos**: El tablero tiene paredes invisibles para contener los cubos.

- **Cestas de Operaciones Aritméticas (Implementado y Corregido)**:
    - **Lógica de Operaciones**: El juego soporta Suma, Resta, Multiplicación y División.
        - **Suma**: `A + B`
        - **Resta**: `max(A, B) - min(A, B)`
        - **Multiplicación**: `A * B`
        - **División**: `A / B` (solo si la división es exacta).
    - **Activación por `enddrag`**: La lógica se ejecuta de forma segura solo cuando el usuario suelta un cubo, evitando bucles indeseados.
    - **Feedback Visual**: Las cestas cambian de apariencia cuando contienen cubos.
    - **Posicionamiento del Resultado**: El nuevo cubo aparece en el centro de la cesta correspondiente.
    - **Animación de Aparición**: El cubo resultante aparece con una animación de escalado.

### 4. Flujo de Interacción Actual

1.  El usuario ve un número objetivo y varios cubos numerados.
2.  Arrastra dos cubos a una de las cuatro cestas de operaciones (`+`, `-`, `*`, `÷`).
3.  Al soltarlos, los dos cubos desaparecen y se crea un nuevo cubo con el resultado de la operación en la misma cesta.
4.  El objetivo es combinar cubos hasta que uno de ellos sea igual al número objetivo.

---

## Plan de Implementación Próximo

**Objetivo:** Implementar la condición de victoria y proporcionar una forma de jugar de nuevo.

**Pasos Concretos:**

1.  **Detectar la Victoria**: En `Board.svelte`, después de cada operación, comprobar si el nuevo `result` es igual al `$target` del store.
2.  **Crear un Componente de Victoria**: Diseñar un componente `Victory.svelte` que se muestre como un overlay o modal cuando se gana.
3.  **Gestionar el Estado de Victoria**: Añadir una variable de estado (p. ej., `gameWon`) en `Game.svelte` para controlar la visibilidad del componente de victoria.
4.  **Botón "Jugar de Nuevo"**: Incluir un botón en el componente de victoria que llame a la función `generateNewRound` para reiniciar el juego.
