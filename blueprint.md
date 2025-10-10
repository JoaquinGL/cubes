
# Blueprint: Cubos & Cestas - Juego de Aritmética con Físicas

## Visión General

`Cubos & Cestas` es un juego web interactivo diseñado para agudizar las habilidades de cálculo mental de una manera lúdica y atractiva. Los jugadores combinan cubos numerados usando operaciones aritméticas básicas para alcanzar un número objetivo. La aplicación destaca por su motor de físicas (`Matter.js`), que permite una interacción táctil y dinámica con los elementos del juego.

El proyecto está construido con **Svelte** y **TypeScript**, aprovechando la reactividad y eficiencia de Svelte para crear una experiencia de usuario fluida y declarativa.

---

## Esquema del Proyecto y Características (Estado Objetivo)

*Esta sección describe la funcionalidad completa que se busca alcanzar.*

### 1. Estructura de Componentes

- **`App.svelte`**: Componente raíz.
- **`Game.svelte`**: Orquesta el estado del juego (puntuación, rondas, etc.).
- **`Board.svelte`**: Gestiona el motor `Matter.js` y las interacciones físicas.
- **`Cube.svelte`**: Representa un cubo numerado y arrastrable.
- **`Basket.svelte`**: Representa una cesta para operaciones aritméticas.

### 2. Lógica y Estado (Stores)

- **`numbers`**: Almacena los cubos activos.
- **`target`**: Almacena el número objetivo de la ronda.

### 3. Mecánica de Juego

- **Drag-and-Drop Físico**: Los jugadores arrastran cubos que interactúan de forma realista.
- **Operaciones por Colisión**: Al soltar dos cubos en una cesta, se realiza la operación correspondiente.
- **Victoria**: Se gana la ronda al obtener el número objetivo.

---

## Plan de Implementación Actual (Modo Depuración)

**Objetivo:** Aislar y solucionar un bug en la mecánica de arrastrar y soltar (`drag-and-drop`).

**Estado Actual:** La aplicación ha sido simplificada radicalmente para centrarse únicamente en la interacción con un solo cubo en un entorno vacío. Esto nos permite analizar el comportamiento del `MouseConstraint` de `Matter.js` sin interferencias.

### Corrección Fundamental: Eliminación del Renderizador de Matter.js

- **Problema Identificado:** Se descubrió un conflicto fundamental. El motor de físicas (`engine.ts`) estaba creando un `Render` de `Matter.js`, lo que generaba un elemento `<canvas>` invisible por encima de los componentes de Svelte. El gestor de arrastre (`MouseConstraint`) estaba escuchando eventos de ratón **únicamente en este canvas**, ignorando por completo los `div` de los cubos que el usuario veía y con los que intentaba interactuar.

- **Solución Aplicada (Realizado):**
    -   **Acción:** Se ha modificado `src/lib/engine.ts` para **eliminar por completo** la creación del `Render` de `Matter.js`.
    -   **Acción:** Se ha reconfigurado el `MouseConstraint` para que escuche los eventos del ratón (`Mouse.create`) directamente en el `HTMLElement` del tablero (`Board.svelte`).
    -   **Propósito:** Esto sincroniza el mundo físico de Matter.js con el mundo visual de Svelte. Ahora, el gestor de arrastre y los componentes visibles por el usuario operan en la misma capa, permitiendo que la interacción funcione correctamente.

### Lógica de Arrastre Bajo Análisis:

La lógica para gestionar el `z-index` y los `pointer-events` al arrastrar varios cubos todavía está presente en `Board.svelte`, pero ahora que la interacción básica está corregida, podrá funcionar como se espera cuando se reintroduzcan más cubos.

**Próximo Paso:** Probar la interacción con el único cubo. Ahora debería ser posible hacer `drag-and-drop` sin problemas. Una vez confirmado, se podrán reintroducir gradualmente los demás elementos del juego (más cubos, cestas) para asegurar que todo sigue funcionando correctamente.
