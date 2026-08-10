import {
    productos,
    productosIniciales,
    filtrarBaratos,
    ordenarAlfabeticamente,
    obtenerNombres,
    calcularCostoTotal,
    ejecutarMetodosConsola
} from './tienda.js';

const formularioProducto = document.getElementById('formulario-producto');
const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorResumen = document.getElementById('contenedor-resumen');
const STORAGE_KEY = 'TiendaProductos';

const obtenerGuardados = () => {
    const datos = localStorage.getItem(STORAGE_KEY);
    return datos ? JSON.parse(datos) : null;
};

const guardarEnStorage = (lista) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
};

const sincronizarArreglo = () => {
    const guardados = obtenerGuardados();
    productos.length = 0;
    if (guardados && guardados.length > 0) {
        productos.push(...guardados);
    } else {
        productos.push(...productosIniciales);
    }
};

const renderizarProductos = () => {
    contenedorProductos.innerHTML = '';

    if (productos.length === 0) {
        contenedorProductos.innerHTML = '<p>No hay productos en la tienda.</p>';
        return;
    }

    productos.forEach((producto, index) => {
        const articulo = document.createElement('article');
        articulo.className = 'receta-item';

        articulo.innerHTML = `
            <div class="receta-cabecera">
                <h3>${producto.nombre}</h3>
                <button class="boton-eliminar" type="button">Eliminar</button>
            </div>
            <p><strong>Precio:</strong> $${producto.precio}</p>
            <p><strong>Categoría:</strong> ${producto.categoria}</p>
        `;

        articulo.querySelector('.boton-eliminar').addEventListener('click', () => {
            productos.splice(index, 1);
            guardarEnStorage(productos);
            actualizarInterfaz();
        });

        contenedorProductos.appendChild(articulo);
    });
};

const renderizarResumenFiltros = () => {
    const baratos = filtrarBaratos(productos);
    const ordenados = ordenarAlfabeticamente(baratos);
    const nombres = obtenerNombres(ordenados);
    const total = calcularCostoTotal(productos);

    contenedorResumen.innerHTML = `
        <article class="receta-item">
            <p><strong>1. Filtrados (< $100):</strong> ${baratos.length > 0 ? baratos.map(p => `${p.nombre} ($${p.precio})`).join(', ') : 'Ninguno'}</p>
            <p><strong>2. Ordenados A-Z (< $100):</strong> ${ordenados.length > 0 ? ordenados.map(p => p.nombre).join(' ➔ ') : 'Ninguno'}</p>
            <p><strong>3. Arreglo MAP (Solo Nombres):</strong></p>
            <pre>[ ${nombres.map(n => `"${n}"`).join(', ')} ]</pre>
            <hr>
            <p><strong>4. REDUCE (Suma Total del Inventario):</strong> $${total}</p>
        </article>
    `;
};

const actualizarInterfaz = () => {
    renderizarProductos();
    renderizarResumenFiltros();
    ejecutarMetodosConsola(productos);
};

// Evento Agregar Producto
formularioProducto.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre-producto').value.trim();
    const precio = parseFloat(document.getElementById('precio-producto').value);
    const categoria = document.getElementById('categoria-producto').value.trim();

    if (nombre && !isNaN(precio) && categoria) {
        productos.push({ nombre, precio, categoria });
        guardarEnStorage(productos);
        actualizarInterfaz();
        formularioProducto.reset();
    }
});

// Evento Restablecer Productos por defecto
document.getElementById('boton-restablecer').addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    sincronizarArreglo();
    actualizarInterfaz();
});

// Inicialización
const iniciarApp = () => {
    sincronizarArreglo();
    actualizarInterfaz();
};

iniciarApp();