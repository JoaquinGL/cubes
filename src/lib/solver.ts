
// src/lib/solver.ts

/**
 * Representa una solución parcial o final, con su valor y la expresión matemática para alcanzarlo.
 */
type Solution = {
    value: number;
    expression: string;
};

let bestSolution: Solution = { value: -1, expression: '' };
let target: number = 0;

/**
 * Busca la mejor solución posible para el juego de Cifras.
 * @param numbers - El array de números iniciales.
 * @param targetNumber - El número objetivo a alcanzar.
 * @returns La solución que más se acerca al objetivo.
 */
export function findBestSolution(numbers: number[], targetNumber: number): Solution {
    target = targetNumber;

    // La mejor solución inicial es, como mínimo, el número de partida más cercano.
    bestSolution = numbers.map(n => ({ value: n, expression: `${n}` }))
                          .reduce((best, current) => 
                              Math.abs(current.value - target) < Math.abs(best.value - target) ? current : best
                          );
    
    // Si uno de los números ya es el objetivo, hemos terminado.
    if (bestSolution.value === target) {
        return bestSolution;
    }

    const initialNodes = numbers.map(n => ({ value: n, expression: `${n}` }));
    solve(initialNodes);
    return bestSolution;
}

/**
 * Función recursiva que explora todas las combinaciones de cálculos.
 * @param nodes - El conjunto de números actual con sus expresiones.
 */
function solve(nodes: Solution[]) {
    // Caso base: si nos quedamos con un solo número, no podemos operar más.
    if (nodes.length < 2) {
        return;
    }

    // Itera sobre cada par único de números en la lista actual.
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i];
            const b = nodes[j];

            // El resto de nodos con los que combinaremos el resultado.
            const remaining = nodes.filter((_, index) => index !== i && index !== j);

            // Generamos todos los resultados posibles entre a y b.
            const operationResults: Solution[] = [];

            operationResults.push({ value: a.value + b.value, expression: `(${a.expression} + ${b.expression})` });
            operationResults.push({ value: a.value * b.value, expression: `(${a.expression} * ${b.expression})` });

            if (a.value > b.value) {
                operationResults.push({ value: a.value - b.value, expression: `(${a.expression} - ${b.expression})` });
            } else if (b.value > a.value) {
                operationResults.push({ value: b.value - a.value, expression: `(${b.expression} - ${a.expression})` });
            }

            if (b.value !== 0 && a.value % b.value === 0) {
                operationResults.push({ value: a.value / b.value, expression: `(${a.expression} / ${b.expression})` });
            }
            if (a.value !== 0 && b.value % a.value === 0) {
                operationResults.push({ value: b.value / a.value, expression: `(${b.expression} / ${a.expression})` });
            }

            // Para cada nuevo resultado, comprobamos si es una mejor solución y continuamos la recursión.
            for (const opResult of operationResults) {
                if (Math.abs(opResult.value - target) < Math.abs(bestSolution.value - target)) {
                    bestSolution = opResult;
                }
                // Si encontramos la solución exacta, la guardamos y paramos esa rama para buscar expresiones más simples.
                if (opResult.value === target) {
                    bestSolution = opResult;
                    continue; // No exploramos más allá de una solución perfecta
                }

                solve([...remaining, opResult]);
            }
        }
    }
}

/**
 * Limpia y simplifica la expresión matemática final.
 * @param expression - La expresión generada por el solver.
 * @returns Una cadena de texto más legible.
 */
export function formatExpression(expression: string): string {
    // Elimina los paréntesis externos innecesarios y espacios.
    return expression.replace(/^\((.*)\)$/, '$1').replace(/\s/g, '');
}

