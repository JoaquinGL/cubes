
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
- **Diseño de Cestas (¡Nuevo!)**:
  - **Izquierda**: Cesta de Suma `(+)` arriba, Cesta de Resta `(-)` abajo.
  - **Derecha**: Cesta de Multiplicación `(×)` arriba, Cesta de División `(÷)` abajo.
- **Validación de Operaciones**:
  - **Resta**: Siempre se calcula `mayor - menor` para evitar negativos.
  - **División**: Solo se permite si el resultado es un entero (`mayor % menor === 0`).
- **Mecánica de Resultado (¡Nuevo!)**:
  - Al soltar dos cubos en una cesta, estos desaparecen.
  - Un **nuevo cubo** con el resultado de la operación aparece en la parte superior central del tablero y cae, volviéndose parte del juego.

### 3. Flujo de Juego Detallado

1.  **Fase de Selección**: El jugador elige la cantidad de números grandes.
2.  **Comienza la Ronda**: El tablero se puebla con los 6 cubos iniciales que caen aleatoriamente. Se muestra el número objetivo.
3.  **Aparición de Cestas**: Tras unos segundos, las 4 cestas aparecen en sus posiciones fijas (dos a cada lado, apiladas).
4.  **Resolución del Puzle**:
    - El jugador arrastra dos cubos y los suelta en una de las cestas.
    - El sistema valida la operación según las reglas.
    - Si es válida, los dos cubos usados desaparecen. Inmediatamente, un nuevo cubo con el resultado cae desde el centro superior del tablero.
    - Si no es válida, los cubos no se ven afectados.
5.  **Victoria**: Si un cubo coincide con el número objetivo, se muestra la pantalla de victoria.
6.  **Controles**: Un botón de "Nueva Selección" permite reiniciar y volver al paso 1.

### 4. Estructura de Componentes

- **`App.svelte`**: Gestiona el cambio entre `NumberSelection` y `Game`.
- **`NumberSelection.svelte`**: UI para elegir los números.
- **`Game.svelte`**: Orquestador principal del juego. **Gestionará la creación del nuevo cubo en el centro del tablero.**
- **`Board.svelte`**: Motor de físicas. **Tendrá la nueva lógica para posicionar las 4 cestas en los laterales.**
- **`Cube.svelte`**: Componente del cubo.
- **`Basket.svelte`**: Visualización de las cestas.

---

## Plan Actual

1.  **Rediseñar `Board.svelte`** para implementar la nueva disposición de las cestas.
2.  **Ajustar `Game.svelte`** para que los nuevos cubos resultantes caigan desde el centro.
