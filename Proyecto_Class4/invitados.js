// Lista inicial de invitados
export const invitadosIniciales = ["Ana", "Carlos", "Cecilia", "Daniel", "Diana", "Eduardo"];

export let invitados = [...invitadosIniciales];

// Función para encontrar el primer par consecutivo con la misma inicial (Dos Punteros)
export function encontrarPareja(arr) {
    let inicio = 0;
    let siguiente = 1;

    while (siguiente < arr.length) {
        // Obtenemos la primera letra en minúscula para evitar problemas de mayúsculas/minúsculas
        const inicialInicio = arr[inicio].charAt(0).toLowerCase();
        const inicialSiguiente = arr[siguiente].charAt(0).toLowerCase();

        // 2 y 3. Compara las iniciales y detén la búsqueda si coinciden
        if (inicialInicio === inicialSiguiente) {
            return [arr[inicio], arr[siguiente]];
        }

        // 4. Avanza ambos punteros si no coinciden
        inicio++;
        siguiente++;
    }

    // 5. Retorna null si recorre toda la lista sin encontrar un par
    return null;
}

// Función auxiliar para agregar un invitado y mantener la lista ordenada alfabéticamente
export function agregarInvitado(nombre) {
    const nombreLimpio = nombre.trim();
    if (!nombreLimpio) return false;

    invitados.push(nombreLimpio);
    invitados.sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
    return true;
}

// Función auxiliar para eliminar un invitado
export function eliminarInvitado(index) {
    invitados.splice(index, 1);
}

// Muestra el resultado directamente en consola
export function ejecutarDemostracionConsola() {
    console.clear();
    console.log("=== Lista Actual de Invitados (Ordenada) ===");
    console.log(invitados);

    const resultado = encontrarPareja(invitados);
    console.log("=== Resultado de encontrarPareja() ===");
    console.log(resultado); // Ejemplo: ["Carlos", "Cecilia"]
}