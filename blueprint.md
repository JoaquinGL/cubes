
# Blueprint: Cubos & Cestas - Juego de Aritmética con Físicas

## Visión General

`Cubos & Cestas` es un juego web interactivo diseñado para agudizar las habilidades de cálculo mental de una manera lúdica y atractiva. Los jugadores combinan cubos numerados usando operaciones aritméticas básicas para alcanzar un número objetivo. La aplicación destaca por su motor de físicas (`Matter.js`), que permite una interacción táctil y dinámica con los elementos del juego.

El proyecto está construido con **Svelte** y **TypeScript**, aprovechando la reactividad y eficiencia de Svelte para crear una experiencia de usuario fluida y declarativa.

---

## Esquema del Proyecto y Características

### 1. Estructura de Componentes

- **`App.svelte`**: Componente raíz.
- **`Game.svelte`**: Orquesta el estado del juego, la UI y los controles de reseteo.
- **`Board.svelte`**: Gestiona el motor `Matter.js` y la lógica de detección en la cesta.
- **`Cube.svelte`**: Representa un cubo numerado y arrastrable, con estilo dinámico.
- **`Basket.svelte`**: Representa el contorno visual de la cesta.
- **`Victory.svelte`**: Modal de victoria que aparece al completar el objetivo.

### 2. Lógica y Estado (Stores)

- **`numbers`**: Almacena los cubos activos, incluyendo su estado (si es resultado de una suma).
- **`target`**: Almacena el número objetivo de la ronda.
- **`generateNewRound`**: Función para generar un nuevo puzle.

### 3. Mecánica de Juego y Físicas

- **Motor de Físicas**: Basado en `Matter.js` para una simulación realista.
- **Interacción de Arrastre**: Los jugadores pueden arrastrar y soltar cubos libremente.

- **Mecánica de Cesta Física (¡Pulida!)**:
    - **Suma por Reposo**: La suma se ejecuta automáticamente cuando dos o más cubos están en reposo dentro de la cesta.
    - **Sincronización Física-UI (¡Implementado!)**: Al realizarse una suma, los cuerpos físicos de los cubos originales se eliminan explícitamente del motor de físicas, asegurando que desaparecen correctamente. El nuevo cubo resultante se crea con su propio cuerpo físico, siendo totalmente interactivo.
    - **Estilo para Cubos de Suma (¡Implementado!)**: Los cubos generados a partir de una suma tienen un color verde distintivo para diferenciarlos visualmente de los cubos originales.

- **Controles de Juego**:
    - **Deshacer Suma**: Un botón que permite revertir la última operación de suma, restaurando los cubos anteriores.
    - **Reset Total**: Un botón que permite reiniciar la ronda por completo, generando un nuevo número objetivo y una nueva configuración de cubos.

- **Condición de Victoria y Bucle de Juego**:
    - **Detección de Victoria**: El juego detecta si un cubo (original o de suma) coincide con el número objetivo.
    - **Pantalla de Victoria y Reinicio**: El bucle de juego con el modal de victoria y el botón de reinicio sigue siendo funcional.

### 4. Flujo de Juego Actual

1.  El usuario ve un número objetivo y varios cubos amarillos que caen en el tablero.
2.  Arrastra y suelta los cubos en la cesta física de la parte inferior.
3.  Cuando dos cubos se detienen, desaparecen y se fusionan en un nuevo **cubo verde** con la suma de sus valores. Este nuevo cubo es completamente interactivo.
4.  El jugador puede usar el botón **"Deshacer Suma"** si comete un error, lo que hará que los cubos originales reaparezcan.
5.  El botón **"Reset Total"** está disponible para empezar una nueva ronda en cualquier momento.
6.  El juego continúa hasta que un cubo coincide con el número objetivo.
7.  **¡Victoria!** Se muestra la pantalla de celebración.

---

## Estado del Proyecto: ¡Juego Pulido y Funcional!

Se han corregido los problemas de sincronización entre la UI de Svelte y el motor de físicas Matter.js. La mecánica de suma ahora es visualmente coherente y funcionalmente robusta. La adición de un estilo distintivo para los cubos resultantes mejora significativamente la claridad del juego.
