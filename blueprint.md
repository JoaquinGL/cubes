
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
- **Diseño de Cestas (Iteración Actual: Solo Suma)**:
  - **Izquierda**: Cesta de Suma `(+)`.
  - **Otras cestas (Resta, Multiplicación, División) están temporalmente desactivadas**.
- **Validación de Operaciones**:
  - Por ahora, solo se implementará la suma.
- **Mecánica de Resultado**:
  - Al soltar dos cubos en la cesta de suma, estos desaparecen.
  - Un **nuevo cubo** con el resultado de la suma aparece en la parte superior central del tablero y cae.

### 3. Flujo de Juego Detallado

1.  **Fase de Selección**: El jugador elige la cantidad de números grandes.
2.  **Comienza la Ronda**: El tablero se puebla con los 6 cubos iniciales. Se muestra el número objetivo.
3.  **Aparición de Cestas**: Tras unos segundos, la cesta de suma aparece en su posición a la izquierda.
4.  **Resolución del Puzle (Suma)**:
    - El jugador arrastra dos cubos a la cesta de suma.
    - Los dos cubos desaparecen y un nuevo cubo con el resultado cae desde el centro.
5.  **Victoria**: Si un cubo coincide con el número objetivo, se muestra la pantalla de victoria.
6.  **Controles**: Un botón de "Nueva Selección" permite reiniciar.

### 4. Estructura de Componentes

- **`App.svelte`**: Gestiona el cambio entre `NumberSelection` y `Game`.
- **`NumberSelection.svelte`**: UI para elegir los números.
- **`Game.svelte`**: Orquestador principal del juego.
- **`Board.svelte`**: Motor de físicas. **Solo mostrará y gestionará la cesta de suma.**
- **`Cube.svelte`**: Componente del cubo.
- **`Basket.svelte`**: Visualización de las cestas.

---

## Plan Actual

1.  **Simplificar `Board.svelte`** para que solo muestre una cesta de suma más ancha.
2.  **Simplificar `Game.svelte`** para que solo procese la operación de suma.
3.  Probar y validar la funcionalidad de la cesta de suma.
4.  Añadir progresivamente el resto de las cestas (resta, multiplicación, división) en futuras iteraciones.
