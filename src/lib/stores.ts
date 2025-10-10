
import { writable } from 'svelte/store';

interface CubeNumber {
  id: number;
  value: number;
}

// --- Stores ---
export const numbers = writable<CubeNumber[]>([]);
export const target = writable<number>(0);

// --- Actions ---

let idCounter = 0;

/**
 * Genera una nueva ronda de juego con 1 número para depuración.
 */
export function generateNewRound() {
  const newNumbers: CubeNumber[] = [];
  newNumbers.push({ id: idCounter++, value: 10 }); // Un solo cubo con valor 10
  
  numbers.set(newNumbers);
  target.set(999); // Un objetivo inalcanzable por ahora
}

/**
 * Añade un nuevo número (cubo) a la lista.
 * @param value El número a añadir.
 */
export function addNumber(value: number) {
    numbers.update(currentNumbers => [
        ...currentNumbers,
        { id: idCounter++, value: value }
    ]);
}

/**
 * Elimina un número (cubo) de la lista por su ID.
 * @param id El ID del número a eliminar.
 */
export function removeNumber(id: number) {
    numbers.update(currentNumbers => currentNumbers.filter(n => n.id !== id));
}
