
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
- **Diseño de Cestas (¡NUEVO!)**:
  - **Izquierda**: Cesta de Suma `(+)` y, debajo de ella, la Cesta de Resta `(-)`.
  - **Otras cestas (Multiplicación, División) están temporalmente desactivadas**.
- **Validación de Operaciones**:
  - **Suma**: `resultado = a + b`
  - **Resta**: `resultado = mayor - menor` (para evitar negativos).
- **Mecánica de Resultado (Fluida)**:
  - Al soltar dos cubos en una cesta, estos desaparecen.
  - Un **nuevo cubo** con el resultado aparece **directamente en el centro de la cesta correspondiente**.

### 3. Flujo de Juego Detallado

1.  **Fase de Selección**: El jugador elige la cantidad de números grandes.
2.  **Comienza la Ronda**: El tablero se puebla con los 6 cubos iniciales. Se muestra el número objetivo.
3.  **Aparición de Cestas**: Tras unos segundos, las cestas de suma y resta aparecen a la izquierda.
4.  **Resolución del Puzle**:
    - El jugador arrastra dos cubos a la cesta de suma o resta.
    - Los dos cubos desaparecen y un nuevo cubo con el resultado aparece en la cesta usada.
5.  **Victoria**: Si un cubo coincide con el número objetivo, se muestra la pantalla de victoria.
6.  **Controles**: Un botón de "Nueva Selección" permite reiniciar.

### 4. Estructura de Componentes

- **`App.svelte`**: Gestiona el cambio entre `NumberSelection` y `Game`.
- **`NumberSelection.svelte`**: UI para elegir los números.
- **`Game.svelte`**: Orquestador principal del juego.
- **`Board.svelte`**: Motor de físicas. Gestiona las zonas de suma y resta.
- **`Cube.svelte`**: Componente del cubo.
- **`Basket.svelte`**: Visualización de las cestas.

---

## Plan Actual

1.  Añadir las cestas de multiplicación `(x)` y división `(/)` a la derecha del tablero.
2.  Implementar la lógica de cálculo para la multiplicación y la división en `Game.svelte`.
3.  Asegurarse de que las reglas del juego para la división (sin decimales, solo división exacta) se implementen correctamente.
