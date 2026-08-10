// 1. Arreglo inicial de productos (al menos 5 elementos)
export const productosIniciales = [
    { nombre: "Camiseta", precio: 15, categoria: "Ropa" },
    { nombre: "Laptop", precio: 800, categoria: "Electrónica" },
    { nombre: "Libro", precio: 12, categoria: "Educación" },
    { nombre: "Zapatos", precio: 50, categoria: "Ropa" },
    { nombre: "Celular", precio: 600, categoria: "Electrónica" }
];

export let productos = [...productosIniciales];

// 2. Usar filter() para obtener los productos que cuesten menos de $100
export const filtrarBaratos = (lista) => {
    return lista.filter((producto) => producto.precio < 100);
};

// 3. Usar sort() para ordenar esos productos alfabéticamente por su nombre
export const ordenarAlfabeticamente = (lista) => {
    return [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre));
};

// 4. Usar map() para generar un nuevo arreglo solo con los nombres
export const obtenerNombres = (lista) => {
    return lista.map((producto) => producto.nombre);
};

// 6. OPCIONALES: Usar reduce() para sumar el total del inventario y some() para comprobar categorías
export const calcularCostoTotal = (lista) => {
    return lista.reduce((total, producto) => total + producto.precio, 0);
};

export const existeCategoria = (lista, categoria) => {
    return lista.some((producto) => producto.categoria.toLowerCase() === categoria.toLowerCase());
};

// 5. Muestra los resultados de la aplicación de cada método en consola
export const ejecutarMetodosConsola = (lista = productos) => {
    console.clear();
    console.log("=== 1. LISTA COMPLETA DE PRODUCTOS ===");
    console.table(lista);

    // Paso 2: Filter
    const productosBaratos = filtrarBaratos(lista);
    console.log("=== 2. FILTER: Productos con precio menor a $100 ===");
    console.table(productosBaratos);

    // Paso 3: Sort
    const productosOrdenados = ordenarAlfabeticamente(productosBaratos);
    console.log("=== 3. SORT: Productos filtrados ordenados alfabéticamente (A-Z) ===");
    console.table(productosOrdenados);

    // Paso 4: Map
    const nombresProductos = obtenerNombres(productosOrdenados);
    console.log("=== 4. MAP: Nombres de los productos filtrados y ordenados ===");
    console.log(nombresProductos);

    // Paso 6: Opcionales (reduce y some)
    const costoTotal = calcularCostoTotal(lista);
    const tieneRopa = existeCategoria(lista, "Ropa");

    console.log("=== 6. MÉTODOS OPCIONALES ===");
    console.log(`- REDUCE: El valor total de todos los productos es: $${costoTotal}`);
    console.log(`- SOME: ¿Hay productos en la categoría 'Ropa'?: ${tieneRopa ? "Sí" : "No"}`);
};