import {
    gifts,
    regalosIniciales,
    findGift,
    agregarRegalo,
    eliminarRegalo,
    ejecutarDemostracionConsola
} from './regalos.js';

const formularioBuscar = document.getElementById('formulario-buscar');
const formularioAgregar = document.getElementById('formulario-agregar');
const contenedorResultado = document.getElementById('contenedor-resultado');
const contenedorLista = document.getElementById('contenedor-lista');
const STORAGE_KEY = 'ListaRegalosNavidad';

const obtenerGuardados = () => {
    const datos = localStorage.getItem(STORAGE_KEY);
    return datos ? JSON.parse(datos) : null;
};

const guardarEnStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts));
};

const sincronizarLista = () => {
    const guardados = obtenerGuardados();
    gifts.length = 0;
    if (guardados && guardados.length > 0) {
        gifts.push(...guardados);
    } else {
        gifts.push(...regalosIniciales);
    }
};

const renderizarLista = () => {
    contenedorLista.innerHTML = '';

    if (gifts.length === 0) {
        contenedorLista.innerHTML = '<p>La lista de regalos está vacía.</p>';
        return;
    }

    gifts.forEach((regalo, index) => {
        const articulo = document.createElement('article');
        articulo.className = 'receta-item';

        articulo.innerHTML = `
            <div class="receta-cabecera">
                <h3>Posición ${index}: <strong>${regalo}</strong></h3>
                <button class="boton-eliminar" type="button">Eliminar</button>
            </div>
        `;

        articulo.querySelector('.boton-eliminar').addEventListener('click', () => {
            eliminarRegalo(index);
            guardarEnStorage();
            actualizarInterfaz();
        });

        contenedorLista.appendChild(articulo);
    });
};

const buscarRegaloEnInterfaz = (nombreRegalo) => {
    const mensaje = findGift(gifts, nombreRegalo);
    const encontrado = mensaje.includes('está en la posición');

    contenedorResultado.innerHTML = `
        <article class="receta-item" style="border-left: 5px solid ${encontrado ? '#a56f48' : '#c15a3b'};">
            <h3>${encontrado ? '🎁 ¡Regalo Encontrado!' : '🔍 Resultado de la Búsqueda'}</h3>
            <p style="font-size: 1.2rem;"><strong>${mensaje}</strong></p>
        </article>
    `;

    ejecutarDemostracionConsola(nombreRegalo);
};

const actualizarInterfaz = () => {
    renderizarLista();
    const inputBuscar = document.getElementById('buscar-regalo');
    const busqueda = inputBuscar.value.trim() || "Lego";
    buscarRegaloEnInterfaz(busqueda);
};

// Evento Formulario Buscar
formularioBuscar.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputBuscar = document.getElementById('buscar-regalo').value;
    buscarRegaloEnInterfaz(inputBuscar);
});

// Evento Formulario Agregar
formularioAgregar.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputNuevo = document.getElementById('nuevo-regalo');

    if (agregarRegalo(inputNuevo.value)) {
        guardarEnStorage();
        actualizarInterfaz();
        inputNuevo.value = '';
    }
});

// Botón Restablecer
document.getElementById('boton-restablecer').addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    sincronizarLista();
    actualizarInterfaz();
});

// Inicialización
const iniciarApp = () => {
    sincronizarLista();
    actualizarInterfaz();
};

iniciarApp();