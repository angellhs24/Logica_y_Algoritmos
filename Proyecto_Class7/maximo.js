// Arreglo de números inicial proporcionado en el ejemplo
export const numerosIniciales = [3, 8, 2, 10, 5, 7];

export let numeros = [...numerosIniciales];

// 1. Función Divide and Conquer para encontrar el número máximo
export function findMax(arr) {
    // Caso base: Si el arreglo está vacío
    if (arr.length === 0) {
        return null;
    }

    // Caso base: Si el arreglo tiene solo un elemento, ese es el máximo
    if (arr.length === 1) {
        return arr[0];
    }

    // 1. Dividir el arreglo en dos mitades
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    // 2. Resolver recursivamente para encontrar el máximo en cada mitad
    const leftMax = findMax(left);
    const rightMax = findMax(right);

    // 3 y 4. Combinar comparando los máximos y devolver el mayor
    return Math.max(leftMax, rightMax);
}

// Funciones auxiliares para gestionar la lista desde la interfaz
export function agregarNumero(valor) {
    const num = parseFloat(valor);
    if (isNaN(num)) return false;
    numeros.push(num);
    return true;
}

export function eliminarNumero(index) {
    numeros.splice(index, 1);
}

// Muestra el proceso y el resultado directamente en la consola
export function ejecutarDemostracionConsola(arr = numeros) {
    console.clear();
    console.log("=== Arreglo de Números Actual ===");
    console.log(arr);

    const maximo = findMax(arr);

    console.log("=== Resultado de findMax() (Divide & Conquer) ===");
    console.log(`El valor máximo encontrado es: ${maximo}`);
}