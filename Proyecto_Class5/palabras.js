// Texto por defecto para pruebas
export const textoEjemplo = "JavaScript es un lenguaje de programación increíble para aprender.";

// Función principal con técnica de ventana deslizante / recorrido
export function findLongestWord(text) {
    if (!text || text.trim() === '') return '';

    // 1. Dividir el texto en palabras usando .split(' ')
    const words = text.split(' ');
    let longestWord = '';

    // 2. Deslizar una ventana que recorra cada palabra del arreglo
    for (let i = 0; i < words.length; i++) {
        // Limpiamos signos de puntuación adjuntos a la palabra (ej: "aprender." -> "aprender")
        const palabraLimpia = words[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

        // Compara la longitud de la palabra actual con la más larga encontrada hasta el momento
        if (palabraLimpia.length > longestWord.length) {
            // Actualiza la palabra más larga
            longestWord = palabraLimpia;
        }
    }

    // 3. Devuelve la palabra más larga
    return longestWord;
}

// Función auxiliar para imprimir el resultado directamente en consola
export function ejecutarDemostracionConsola(texto = textoEjemplo) {
    console.clear();
    console.log("=== Texto a analizar ===");
    console.log(`"${texto}"`);

    const resultado = findLongestWord(texto);

    console.log("=== Resultado findLongestWord() ===");
    console.log(`Palabra más larga: "${resultado}" (${resultado.length} caracteres)`);
}