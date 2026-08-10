import { listaDeCompras, agregarProducto, eliminarProducto, mostrarLista } from './compras.js';

const formularioCompras = document.getElementById('formulario-compras');
const contenedorLista = document.getElementById('contenedor-lista-compras');
const STORAGE_KEY = 'ListaDeCompras';

const obtenerGuardados = () => {
    const datos = localStorage.getItem(STORAGE_KEY);
    return datos ? JSON.parse(datos) : [];
};

const guardarEnStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listaDeCompras));
};

const sincronizarArreglo = () => {
    const guardados = obtenerGuardados();
    listaDeCompras.length = 0; // Limpiar arreglo actual
    listaDeCompras.push(...guardados);
};

const crearElementoProducto = (producto, index) => {
    const articulo = document.createElement('article');
    articulo.className = 'receta-item'; // Reutiliza estilo de caja

    articulo.innerHTML = `
        <div class="receta-cabecera">
            <h3>${index + 1}. ${producto}</h3>
            <button class="boton-eliminar" type="button">Eliminar</button>
        </div>
    `;

    const botonEliminar = articulo.querySelector('.boton-eliminar');
    botonEliminar.addEventListener('click', () => {
        eliminarProducto(producto);
        guardarEnStorage();
        actualizarInterfaz();
    });

    return articulo;
};

const actualizarInterfaz = () => {
    contenedorLista.innerHTML = '';

    if (listaDeCompras.length === 0) {
        const mensaje = document.createElement('p');
        mensaje.textContent = 'No hay productos en la lista aún.';
        contenedorLista.appendChild(mensaje);
        mostrarLista();
        return;
    }

    listaDeCompras.forEach((producto, index) => {
        contenedorLista.appendChild(crearElementoProducto(producto, index));
    });

    mostrarLista(); // Muestra el estado actualizado en consola
};

const eliminarTodosLosProductos = () => {
    listaDeCompras.length = 0;
    localStorage.removeItem(STORAGE_KEY);
    actualizarInterfaz();
};

// Evento Submit del formulario
formularioCompras.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputProducto = document.getElementById('nombre-producto');
    const exito = agregarProducto(inputProducto.value);

    if (exito) {
        guardarEnStorage();
        actualizarInterfaz();
        formularioCompras.reset();
    } else {
        alert('El producto ya existe en la lista o no es válido.');
    }
});

const botonEliminarTodas = document.getElementById('boton-eliminar-todas');
botonEliminarTodas.addEventListener('click', eliminarTodosLosProductos);

// Inicializar la aplicación
const iniciarApp = () => {
    sincronizarArreglo();

    // Ejemplo de prueba inicial si la lista está vacía
    if (listaDeCompras.length === 0) {
        agregarProducto('Manzanas');
        agregarProducto('Leche');
        guardarEnStorage();
    }

    actualizarInterfaz();
};

iniciarApp();