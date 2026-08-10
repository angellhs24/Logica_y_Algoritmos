// ==========================================
// 1. BASE DE DATOS INICIAL
// ==========================================
const productos = [
  { id: 1, nombre: 'Mouse', precio: 300, stock: 5, categoria: 'Electrónica' },
  { id: 2, nombre: 'Teclado', precio: 700, stock: 0, categoria: 'Electrónica' },
  { id: 3, nombre: 'Monitor', precio: 2500, stock: 2, categoria: 'Electrónica' },
  { id: 4, nombre: 'Silla', precio: 1500, stock: 4, categoria: 'Muebles' },
  { id: 5, nombre: 'Cable HDMI', precio: 120, stock: 10, categoria: 'Accesorios' }
];

console.log("=== PROYECTO: BUSCADOR Y ANALIZADOR DE PRODUCTOS ===\n");

// ==========================================
// REQUISITOS PRINCIPALES
// ==========================================

// 1. Filtrar productos disponibles (stock > 0)
const productosDisponibles = productos.filter((producto) => producto.stock > 0);
console.log("1. Productos disponibles:", productosDisponibles);

// 2. Buscar un producto por nombre con find()
const nombreBuscado = "Monitor";
const productoEncontrado = productos.find((producto) => producto.nombre === nombreBuscado);
console.log(`2. Producto encontrado ('${nombreBuscado}'):`, productoEncontrado);

// 3. Calcular el valor total del inventario (precio * stock)
const valorInventario = productos.reduce((total, producto) => {
  return total + (producto.precio * producto.stock);
}, 0);
console.log("3. Valor total del inventario: $", valorInventario);

// 4. Validar si hay al menos un producto agotado con some()
const hayAgotados = productos.some((producto) => producto.stock === 0);
console.log("4. ¿Hay productos agotados?:", hayAgotados);

// 5. Ordenar productos del más barato al más caro con sort()
const productosOrdenados = [...productos].sort((a, b) => a.precio - b.precio);
console.log("5. Productos ordenados por precio (menor a mayor):", productosOrdenados);


// ==========================================
// RETOS ADICIONALES
// ==========================================
console.log("\n--- RETOS ADICIONALES ---");

// Reto 1: Mostrar solo los nombres de los productos disponibles usando map()
const nombresDisponibles = productosDisponibles.map((producto) => producto.nombre);
console.log("Reto 1 - Nombres de productos disponibles:", nombresDisponibles);

// Reto 2: Validar si todos los productos tienen precio mayor a 0 usando every()
const todosTienenPrecio = productos.every((producto) => producto.precio > 0);
console.log("Reto 2 - ¿Todos los productos tienen precio mayor a 0?:", todosTienenPrecio);

// Reto 3: Función buscarProducto(nombre)
function buscarProducto(nombre) {
  const resultado = productos.find(
    (p) => p.nombre.toLowerCase() === nombre.toLowerCase()
  );
  return resultado ? resultado : `El producto '${nombre}' no existe.`;
}
console.log("Reto 3 - Función buscarProducto('Silla'):", buscarProducto("Silla"));

// Reto 4: Función calcularInventario(listaProductos)
function calcularInventario(lista) {
  return lista.reduce((total, p) => total + (p.precio * p.stock), 0);
}
console.log("Reto 4 - Función calcularInventario(): $", calcularInventario(productos));

// Reto 5: Filtrar productos por categoría
function filtrarPorCategoria(categoria) {
  return productos.filter((p) => p.categoria.toLowerCase() === categoria.toLowerCase());
}
console.log("Reto 5 - Filtrar por categoría ('Electrónica'):", filtrarPorCategoria("Electrónica"));

// Reto 6: Mostrar el producto más caro
const productoMasCaro = productosOrdenados[productosOrdenados.length - 1];
console.log("Reto 6 - Producto más caro:", productoMasCaro);

// Reto 7: Mostrar el producto más barato
const productoMasBarato = productosOrdenados[0];
console.log("Reto 7 - Producto más barato:", productoMasBarato);

// Reto 8: Crear un resumen con los totales requeridos
const resumen = {
  totalProductos: productos.length,
  cantidadAgotados: productos.filter((p) => p.stock === 0).length,
  valorTotalInventario: calcularInventario(productos)
};
console.log("Reto 8 - Resumen del Inventario:", resumen);