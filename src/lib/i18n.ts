import { writable, derived } from 'svelte/store';

export type Language = 'es' | 'en';

// Store para el idioma actual
const storedLanguage = (typeof localStorage !== 'undefined' && localStorage.getItem('language')) as Language | null;
export const currentLanguage = writable<Language>(storedLanguage || 'es');

// Guardar en localStorage cuando cambie
currentLanguage.subscribe(lang => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('language', lang);
  }
});

// Traducciones
const translations = {
  es: {
    // Pantalla inicial
    title: 'El Desafío Aritmético',
    subtitle: 'Prepara tu mente para el cálculo',
    selectNumbers: 'Elige tus números',
    howManyLarge: '¿Cuántos números "grandes" quieres? (25, 50, 75, 100)',
    large: 'grande',
    larges: 'grandes',
    startPlaying: '¡Empezar a Jugar!',
    randomTotal: 'Random Total',
    howToPlay: '¿Cómo se Juega?',
    
    // Juego
    objective: 'Objetivo',
    reset: 'Reiniciar',
    finish: 'Finalizar',
    newSelection: 'Nueva Selección',
    
    // Modal de instrucciones
    howToPlayTitle: '¿Cómo se Juega?',
    howToPlayIntro: 'El objetivo es simple: <strong>alcanzar el número objetivo</strong> que aparece en la parte superior de la pantalla.',
    howToPlayStep1: 'Tienes <strong>seis números iniciales</strong> en cubos de madera.',
    howToPlayStep2: 'Arrastra dos cubos y suéltalos dentro de una de las <strong>cuatro cestas de operaciones</strong> (suma, resta, multiplicación o división) que aparecerán.',
    howToPlayStep3: 'Al hacerlo, los dos números originales desaparecerán y aparecerá un <strong>nuevo cubo con el resultado</strong>.',
    howToPlayStep4: 'Puedes usar los nuevos resultados en cálculos posteriores.',
    rulesTitle: 'Reglas de las Operaciones',
    rulesSubtract: '<strong>Resta:</strong> Siempre se resta el número menor al mayor, el resultado nunca es negativo.',
    rulesDivide: '<strong>División:</strong> Solo es válida si el resultado es un número entero (por ejemplo, 10 / 2 es válido, pero 10 / 3 no).',
    tip: 'No tienes que usar los seis números. ¡Intenta llegar al objetivo de la forma que puedas!',
    understood: '¡Entendido!',
    
    // Victoria
    victoryTitle: '¡Objetivo Conseguido!',
    victorySubtitle: '¡Tu mente es una calculadora!',
    playAgain: 'Jugar de Nuevo',
    
    // Resumen
    summaryTitle: '¡Fin de la Partida!',
    summaryPerfect: '¡Has clavado el objetivo!',
    summaryObjective: 'Objetivo',
    summaryYourBest: 'Tu mejor número',
    summaryDifference: 'Te has quedado a <span class="difference">{difference}</span> del objetivo.',
    idealSolution: 'Solución Ideal',
    noSolution: 'No se encontró una solución.',
  },
  en: {
    // Initial screen
    title: 'The Arithmetic Challenge',
    subtitle: 'Prepare your mind for calculation',
    selectNumbers: 'Choose your numbers',
    howManyLarge: 'How many "large" numbers do you want? (25, 50, 75, 100)',
    large: 'large',
    larges: 'large',
    startPlaying: 'Start Playing!',
    randomTotal: 'Random Total',
    howToPlay: 'How to Play?',
    
    // Game
    objective: 'Target',
    reset: 'Reset',
    finish: 'Finish',
    newSelection: 'New Selection',
    
    // Instructions modal
    howToPlayTitle: 'How to Play?',
    howToPlayIntro: 'The goal is simple: <strong>reach the target number</strong> that appears at the top of the screen.',
    howToPlayStep1: 'You have <strong>six starting numbers</strong> on wooden cubes.',
    howToPlayStep2: 'Drag two cubes and drop them into one of the <strong>four operation baskets</strong> (addition, subtraction, multiplication or division) that will appear.',
    howToPlayStep3: 'When you do this, the two original numbers will disappear and a <strong>new cube with the result</strong> will appear.',
    howToPlayStep4: 'You can use the new results in subsequent calculations.',
    rulesTitle: 'Operation Rules',
    rulesSubtract: '<strong>Subtraction:</strong> Always subtract the smaller from the larger number, the result is never negative.',
    rulesDivide: '<strong>Division:</strong> Only valid if the result is a whole number (e.g., 10 / 2 is valid, but 10 / 3 is not).',
    tip: 'You don\'t have to use all six numbers. Try to reach the target however you can!',
    understood: 'Got it!',
    
    // Victory
    victoryTitle: 'Target Reached!',
    victorySubtitle: 'Your mind is a calculator!',
    playAgain: 'Play Again',
    
    // Summary
    summaryTitle: 'Game Over!',
    summaryPerfect: 'You nailed the target!',
    summaryObjective: 'Target',
    summaryYourBest: 'Your best number',
    summaryDifference: 'You were <span class="difference">{difference}</span> away from the target.',
    idealSolution: 'Ideal Solution',
    noSolution: 'No solution found.',
  }
};

// Store derivado con las traducciones del idioma actual
export const t = derived(currentLanguage, $lang => translations[$lang]);

// Función helper para cambiar idioma
export function setLanguage(lang: Language) {
  currentLanguage.set(lang);
}

