
import { writable, get } from 'svelte/store';

export interface CubeNumber {
  id: number;
  value: number;
  x: number;
  y: number;
}

let idCounter = 0;

// --- Stores ---
export const numbers = writable<CubeNumber[]>([]);
export const initialNumbers = writable<CubeNumber[]>([]); // To store the round's starting numbers
export const target = writable<number | null>(null);

// --- Constantes del Juego ---
const LARGE_NUMBERS = [25, 50, 75, 100];
const SMALL_NUMBERS = Array.from({ length: 10 }, (_, i) => i + 1);

// --- Funciones de Lógica del Juego ---

/**
 * Genera un número aleatorio para el objetivo.
 */
function generateTarget(): number {
  return Math.floor(Math.random() * 900) + 100;
}

/**
 * Baraja un array.
 */
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Crea la ronda de juego según las reglas de "Cifras y Letras".
 * @param largeNumbersCount - El número de números grandes a usar (0-4).
 */
export function generateNewRound(largeNumbersCount: number) {
  idCounter = 0;
  target.set(generateTarget());

  const selectedLarge = shuffle([...LARGE_NUMBERS]).slice(0, largeNumbersCount);
  const smallNumbersNeeded = 6 - largeNumbersCount;
  
  const selectedSmall: number[] = [];
  for (let i = 0; i < smallNumbersNeeded; i++) {
    // Permitimos que los números pequeños se repitan, como en el juego real
    selectedSmall.push(SMALL_NUMBERS[Math.floor(Math.random() * SMALL_NUMBERS.length)]);
  }

  const startingValues = [...selectedLarge, ...selectedSmall];

  // Calcular el ancho disponible basado en el tamaño de la pantalla
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isSmallMobile = typeof window !== 'undefined' && window.innerWidth < 480;
  
  // Ajustar posiciones según el tamaño de pantalla
  // Considerando padding del contenedor: 0.5rem (móvil pequeño), 1rem (tablet), 2rem (desktop)
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const containerPadding = isSmallMobile ? 8 : isMobile ? 16 : 32; // En píxeles
  const boardWidth = isMobile 
    ? Math.min(viewportWidth - containerPadding * 2, 1000)
    : 1000;
  
  const cubeSize = isSmallMobile ? 50 : isMobile ? 60 : 70;
  const margin = cubeSize / 2 + 30; // Margen seguro desde los bordes
  const startX = margin;
  const endX = boardWidth - margin;
  const spacing = (endX - startX) / Math.max(startingValues.length - 1, 1);

  // Damos a cada número una posición inicial aleatoria en la parte superior del tablero
  const newNumbers = startingValues.map((value, i) => ({
    id: idCounter++,
    value,
    // Posición X distribuida uniformemente con algo de aleatoriedad
    x: Math.min(Math.max(startX + i * spacing + Math.random() * 20 - 10, margin), boardWidth - margin), 
    y: 50 + Math.random() * 20 - 10,
  }));

  // Store the initial state and set the current numbers
  initialNumbers.set(JSON.parse(JSON.stringify(newNumbers))); // Deep copy
  numbers.set(newNumbers);
}

/**
 * Resets the current round to its initial numbers.
 */
export function resetRound() {
  const currentInitial = get(initialNumbers);
  // We need to create a deep copy to avoid weird reactivity issues with Matter.js
  // bodies being shared across renders.
  numbers.set(JSON.parse(JSON.stringify(currentInitial)));
}


/**
 * Elimina un conjunto de cubos del juego por su ID.
 * @param ids - Un array de IDs de los cubos a eliminar.
 */
export function removeNumbers(ids: number[]) {
    numbers.update(currentNumbers => 
        currentNumbers.filter(num => !ids.includes(num.id))
    );
}

/**
 * Añade un nuevo cubo al juego, típicamente como resultado de una operación.
 * @param value - El valor del nuevo cubo.
 * @param x - Posición X de aparición.
 * @param y - Posición Y de aparición.
 */
export function addNumber(value: number, x: number, y: number) {
    numbers.update(currentNumbers => {
        const newNumber: CubeNumber = {
            id: idCounter++,
            value,
            x,
            y
        };
        return [...currentNumbers, newNumber];
    });
}
