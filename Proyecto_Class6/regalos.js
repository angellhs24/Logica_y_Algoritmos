// Lista inicial de regalos dada en las instrucciones
export const regalosIniciales = ["Muñeca", "Carro de juguete", "Rompecabezas", "Lego", "Pelota"];

export let gifts = [...regalosIniciales];

// 1. Función recursiva para buscar un regalo en el arreglo
export function findGift(gifts, giftName, index = 0) {
    const regaloBuscado = giftName.trim().toLowerCase();

    // Caso base 1: Si llegamos al final de la lista sin encontrarlo
    if (index === gifts.length) {
        return `${giftName} no está en la lista.`;
    }

    // Caso base 2: Si se encuentra el regalo en la posición actual
    if (gifts[index].toLowerCase() === regaloBuscado) {
        return `${gifts[index]} está en la posición ${index}.`;
    }

    // Llamada recursiva: Avanza al siguiente índice
    return findGift(gifts, giftName, index + 1);
}

// Funciones auxiliares para modificar el arreglo en la interfaz
export function agregarRegalo(nombre) {
    const nombreLimpio = nombre.trim();
    if (!nombreLimpio) return false;
    gifts.push(nombreLimpio);
    return true;
}

export function eliminarRegalo(index) {
    gifts.splice(index, 1);
}

// Demostración por consola solicitada en la plantilla
export function ejecutarDemostracionConsola(busqueda = "Lego") {
    console.clear();
    console.log("=== Lista Actual de Regalos ===");
    console.log(gifts);

    console.log(`=== Búsqueda 1: "${busqueda}" ===`);
    console.log(findGift(gifts, busqueda));

    console.log('=== Búsqueda 2 (Inexistente): "Camión" ===');
    console.log(findGift(gifts, "Camión"));
}