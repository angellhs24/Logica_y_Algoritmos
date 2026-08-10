// Arreglo principal
export let listaDeCompras = [];

// Función para agregar un producto (evitando duplicados)
export const agregarProducto = (producto) => {
    const productoLimpio = producto.trim();
    if (!productoLimpio) return false;

    // Verificar si el producto ya existe (ignorando mayúsculas/minúsculas)
    const yaExiste = listaDeCompras.some(
        (item) => item.toLowerCase() === productoLimpio.toLowerCase()
    );

    if (yaExiste) {
        console.warn(`El producto "${productoLimpio}" ya está en la lista.`);
        return false;
    }

    listaDeCompras.push(productoLimpio);
    return true;
};

// Función para eliminar un producto
export const eliminarProducto = (producto) => {
    listaDeCompras = listaDeCompras.filter(
        (item) => item.toLowerCase() !== producto.trim().toLowerCase()
    );
};

// Función para imprimir la lista completa en consola
export const mostrarLista = () => {
    console.log("--- Lista de Compras ---");
    if (listaDeCompras.length === 0) {
        console.log("La lista está vacía.");
        return;
    }
    listaDeCompras.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto}`);
    });
    console.log("-----------------------");
};