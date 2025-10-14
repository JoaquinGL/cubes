
import Matter from 'matter-js';

/**
 * Configura y devuelve un motor de físicas de Matter.js con control de ratón.
 * @param element El elemento HTML que contendrá la simulación y donde se escucharán los eventos del ratón.
 * @returns Un objeto con el motor, el mundo y el propio controlador del ratón.
 */
export function setupEngine(element: HTMLElement) {
    const { Engine, Runner, World, Mouse, MouseConstraint } = Matter;

    const engine = Engine.create();
    const world = engine.world;

    const runner = Runner.create();
    Runner.run(runner, engine);

    const mouse = Mouse.create(element);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    World.add(world, mouseConstraint);

    return { engine, world, mouseConstraint };
}

/**
 * Añade los 4 muros invisibles al mundo para que los objetos no se caigan.
 * Se ajusta la posición para que los objetos descansen sobre el borde visual.
 * @param world El mundo de Matter.js
 * @param width El ancho del área de juego.
 * @param height La altura del área de juego.
 */
export function addBoundaries(world: Matter.World, width: number, height: number) {
    const { Bodies, World } = Matter;
    const wallThickness = 20; // Grosor del muro invisible
    const adjustment = 4; // Pequeño ajuste para alinear con el borde visual (mitad del grosor del borde de Board.svelte)

    World.add(world, [
        // Techo (Top wall) - Ligeramente desplazado hacia abajo
        Bodies.rectangle(width / 2, -wallThickness / 2 + adjustment, width, wallThickness, { isStatic: true }),

        // Suelo (Bottom wall) - Ligeramente desplazado hacia arriba
        Bodies.rectangle(width / 2, height + wallThickness / 2 - adjustment, width, wallThickness, { isStatic: true }),

        // Pared izquierda (Left wall) - Ligeramente desplazada hacia la derecha
        Bodies.rectangle(-wallThickness / 2 + adjustment, height / 2, wallThickness, height, { isStatic: true }),
        
        // Pared derecha (Right wall) - Ligeramente desplazada hacia la izquierda
        Bodies.rectangle(width + wallThickness / 2 - adjustment, height / 2, wallThickness, height, { isStatic: true })
    ]);
}
