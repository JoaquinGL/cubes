
# Blueprint: Cubos & Cestas - El Desafío Aritmético

## Visión General

`Cubos & Cestas` es una adaptación interactiva del clásico juego de cálculo "Cifras y Letras". El objetivo es utilizar seis números generados aleatoriamente para alcanzar, o aproximarse lo máximo posible, a una cifra objetivo de tres dígitos mediante operaciones aritméticas básicas. La aplicación utiliza un motor de físicas (`Matter.js`) para una interacción táctil y atractiva, donde los números son "cubos" que se arrastran a "cestas" de operaciones.

El proyecto está construido con **Svelte** y **TypeScript**, buscando una experiencia de usuario fluida, reactiva y educativa.

---

## Esquema del Proyecto y Características

### 1. Fases del Juego

El juego se divide en dos fases principales:

- **Fase de Selección**: El jugador decide la composición de sus números para la ronda.
- **Fase de Juego**: El jugador intenta resolver el puzle aritmético en el tablero de físicas.

### 2. Mecánica de Juego (Reglas de "Cifras y Letras")

#### 🎯 Objetivo
- **Generación**: Al inicio de cada ronda, se genera un número objetivo aleatorio de tres cifras (100-999).
- **Meta**: El jugador debe alcanzar esa cifra exacta.

#### 🧮 Material (Números)
- **Números Disponibles**:
  - **Pequeños**: Números enteros del 1 al 10.
  - **Grandes**: 25, 50, 75, 100.
- **Selección del Jugador**:
  - En la "Fase de Selección", el jugador elige cuántos números grandes quiere (de 0 a 4).
  - El sistema completa los seis números restantes con números pequeños elegidos al azar.
  - *Ejemplo*: Si el jugador elige 2 grandes, recibirá 2 números del grupo {25, 50, 75, 100} y 4 números del grupo {1-10}.

#### ⚙️ Reglas de Cálculo
- **Uso Único**: Cada cubo (número) solo puede usarse una vez.
- **Operaciones Básicas**: Las cuatro cestas del tablero se corresponden con:
  - `+` Suma
  - `-` Resta
  - `×` Multiplicación
  - `÷` División
- **Validación de Operaciones**:
  - **Resta**: El resultado no puede ser negativo (`a - b` donde `a > b`).
  - **División**: El resultado debe ser un número entero (`a % b === 0`).
- **Encadenamiento**: El resultado de una operación se convierte en un nuevo cubo en el tablero. Este nuevo cubo puede ser utilizado para operaciones posteriores.
- **Consumo**: Los dos cubos utilizados en una operación desaparecen y son reemplazados por el cubo del resultado.

### 3. Flujo de Juego Detallado

1.  **Inicio (Fase de Selección)**:
    - Se presenta al jugador una interfaz para elegir de 0 a 4 números grandes.
    - Una vez hecha la selección, el jugador pulsa "Empezar Juego".
2.  **Comienza la Ronda (Fase de Juego)**:
    - El tablero se puebla con los 6 cubos numerados según la selección del jugador.
    - Se muestra el número objetivo de 3 cifras.
    - Tras un breve retraso, aparecen las cuatro cestas de operaciones (+, -, ×, ÷) en el centro del tablero.
3.  **Resolución del Puzle**:
    - El jugador arrastra dos cubos y los suelta sobre una de las cestas.
    - El sistema valida la operación. Si no es válida (ej. `5 / 2` o `3 - 10`), los cubos vuelven a su sitio.
    - Si la operación es válida, los dos cubos se eliminan y se crea un nuevo cubo con el resultado. Este nuevo cubo es interactivo y puede ser usado en futuras operaciones.
4.  **Condición de Victoria**:
    - Si en algún momento un cubo resultante es igual al número objetivo, el juego se detiene y se muestra un mensaje de victoria.
5.  **Controles**:
    - **Reset Total**: Un botón permite al jugador abandonar la ronda actual y volver a la "Fase de Selección" para empezar de nuevo.

### 4. Estructura de Componentes Propuesta

- **`App.svelte`**: Raíz, gestiona qué fase mostrar (Selección o Juego).
- **`NumberSelection.svelte` (Nuevo)**: Componente para la fase de selección de números.
- **`Game.svelte`**: Orquestador principal de la fase de juego.
- **`Board.svelte`**: Motor de físicas, ahora con lógica para detectar colisiones en 4 zonas distintas y reportar los cubos implicados y la operación.
- **`Cube.svelte`**: Representación de un número.
- **`Basket.svelte`**: Visualización de las zonas de operación.

---

## Próximos Pasos

1.  **Crear el componente `NumberSelection.svelte`**.
2.  **Modificar `App.svelte`** para gestionar el cambio entre `NumberSelection` y `Game`.
3.  **Actualizar `stores.ts`** con la nueva lógica de generación de números.
4.  **Implementar la lógica de detección de operaciones y validación** en `Board.svelte` y `Game.svelte`.
