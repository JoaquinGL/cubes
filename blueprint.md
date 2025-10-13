
# Blueprint: Cubos & Cestas - El Desafío Aritmético

## Visión General

`Cubos & Cestas` es una adaptación interactiva del clásico juego de cálculo "Cifras y Letras". El objetivo es utilizar seis números generados aleatoriamente para alcanzar una cifra objetivo de tres dígitos mediante operaciones aritméticas básicas. La aplicación utiliza un motor de físicas (`Matter.js`) para una interacción táctil y atractiva, donde los números son "cubos" que se arrastran a "cestas" de operaciones.

El proyecto está construido con **Svelte** y **TypeScript**, buscando una experiencia de usuario fluida, reactiva y educativa.

---

## Esquema del Proyecto y Características

### 1. Fases del Juego

- **Fase de Selección**: El jugador decide la composición de sus números para la ronda.
- **Fase de Juego**: El jugador intenta resolver el puzle aritmético en el tablero de físicas.

### 2. Mecánica de Juego (Reglas de "Cifras y Letras")

#### 🎯 Objetivo
- **Generación**: Se genera un número objetivo aleatorio (100-999).
- **Meta**: El jugador debe alcanzar esa cifra exacta.

#### 🧮 Material (Números)
- **Pequeños**: {1-10}, **Grandes**: {25, 50, 75, 100}.
- **Selección del Jugador**: Elige de 0 a 4 grandes, y el resto se completa con pequeños hasta tener 6 números.

#### ⚙️ Reglas de Cálculo
- **Uso Único**: Cada cubo solo puede usarse una vez.
- **Diseño de Cestas (COMPLETADO)**:
  - **Izquierda**: Cesta de Suma `(+)` y Cesta de Resta `(-)`.
  - **Derecha**: Cesta de Multiplicación `(x)` y Cesta de División `(/)`.
- **Validación de Operaciones**:
  - **Suma**: `resultado = a + b`
  - **Resta**: `resultado = mayor - menor` (para evitar negativos).
  - **Multiplicación**: `resultado = a * b`
  - **División**: `resultado = mayor / menor` (solo si la división es exacta, sin decimales).
- **Mecánica de Resultado (Fluida)**:
  - Al soltar dos cubos en una cesta, estos desaparecen.
  - Un **nuevo cubo** con el resultado aparece **directamente en el centro de la cesta correspondiente**.

### 3. Flujo de Juego Detallado

1.  **Fase de Selección**: El jugador elige la cantidad de números grandes.
2.  **Comienza la Ronda**: El tablero se puebla con los 6 cubos iniciales. Se muestra el número objetivo.
3.  **Aparición de Cestas**: Tras unos segundos, las cuatro cestas de operaciones aparecen en el tablero.
4.  **Resolución del Puzle**:
    - El jugador arrastra dos cubos a cualquiera de las cuatro cestas.
    - Si la operación es válida, los dos cubos desaparecen y un nuevo cubo con el resultado aparece en la cesta usada.
5.  **Victoria**: Si un cubo coincide con el número objetivo, se muestra la pantalla de victoria.
6.  **Controles**: Un botón de "Nueva Selección" permite reiniciar.

### 4. Estructura de Componentes

- **`App.svelte`**: Gestiona el cambio entre `NumberSelection` y `Game`.
- **`NumberSelection.svelte`**: UI para elegir los números.
- **`Game.svelte`**: Orquestador principal del juego.
- **`Board.svelte`**: Motor de físicas. Gestiona las cuatro zonas de operaciones.
- **`Cube.svelte`**: Componente del cubo.
- **`Basket.svelte`**: Visualización de las cestas.

---

## Plan Actual

- **¡Funcionalidad principal completada!**
- Posibles siguientes pasos:
  - Mejorar la estética y las animaciones.
  - Añadir un temporizador para la ronda.
  - Implementar un sistema de puntuación.
  - Añadir sonidos para las operaciones y la victoria.
