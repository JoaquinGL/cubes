
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
 * @param world El mundo de Matter.js
 * @param width El ancho del área de juego.
 * @param height La altura del área de juego.
 */
export function addBoundaries(world: Matter.World, width: number, height: number) {
    const { Bodies, World } = Matter;
    const wallThickness = 50;

    World.add(world, [
        // Techo (Top wall)
        Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, { isStatic: true }),

        // Suelo (Bottom wall)
        Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true }),

        // Pared izquierda (Left wall)
        Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
        
        // Pared derecha (Right wall)
        Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, { isStatic: true })
    ]);
}
