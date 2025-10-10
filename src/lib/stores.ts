
import { writable } from 'svelte/store';

interface CubeNumber {
  id: number;
  value: number;
  // Añadimos posición opcional para la creación
  x?: number;
  y?: number;
}

// --- Stores ---
export const numbers = writable<CubeNumber[]>([]);
export const target = writable<number>(0);

// --- Actions ---

let idCounter = 0;

/**
 * Genera una nueva ronda de juego con números aleatorios y un objetivo.
 */
export function generateNewRound() {
  const newNumbers: CubeNumber[] = [];
  const numberOfCubes = 5;

  for (let i = 0; i < numberOfCubes; i++) {
    const randomValue = Math.floor(Math.random() * 20) + 1;
    newNumbers.push({ id: idCounter++, value: randomValue });
  }
  
  const newTarget = Math.floor(Math.random() * 81) + 20; // Target entre 20 y 100

  numbers.set(newNumbers);
  target.set(newTarget);
}

/**
 * Añade un nuevo número (cubo) a la lista.
 * @param value El número a añadir.
 * @param x Posición x inicial opcional.
 * @param y Posición y inicial opcional.
 */
export function addNumber(value: number, x?: number, y?: number) {
    numbers.update(currentNumbers => [
        ...currentNumbers,
        { id: idCounter++, value: value, x, y }
    ]);
}

/**
 * Elimina un número (cubo) de la lista por su ID.
 * @param id El ID del número a eliminar.
 */
export function removeNumber(id: number) {
    numbers.update(currentNumbers => currentNumbers.filter(n => n.id !== id));
}
