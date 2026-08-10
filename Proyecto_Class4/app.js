import {
    invitados,
    invitadosIniciales,
    encontrarPareja,
    agregarInvitado,
    eliminarInvitado,
    ejecutarDemostracionConsola
} from './invitados.js';

const formularioInvitados = document.getElementById('formulario-invitado');
const contenedorInvitados = document.getElementById('contenedor-invitados');
const contenedorResultado = document.getElementById('contenedor-resultado');
const STORAGE_KEY = 'ListaInvitadosMesa';

const obtenerGuardados = () => {
    const datos = localStorage.getItem(STORAGE_KEY);
    return datos ? JSON.parse(datos) : null;
};

const guardarEnStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invitados));
};

const sincronizarLista = () => {
    const guardados = obtenerGuardados();
    invitados.length = 0;
    if (guardados && guardados.length > 0) {
        invitados.push(...guardados);
    } else {
        invitados.push(...invitadosIniciales);
    }
};

const renderizarListaInvitados = () => {
    contenedorInvitados.innerHTML = '';

    if (invitados.length === 0) {
        contenedorInvitados.innerHTML = '<p>No hay invitados en la lista.</p>';
        return;
    }

    invitados.forEach((nombre, index) => {
        const articulo = document.createElement('article');
        articulo.className = 'receta-item';

        articulo.innerHTML = `
            <div class="receta-cabecera">
                <h3>${index + 1}. ${nombre} <small style="color: #888;">(Inicial: "${nombre.charAt(0).toUpperCase()}")</small></h3>
                <button class="boton-eliminar" type="button">Eliminar</button>
            </div>
        `;

        articulo.querySelector('.boton-eliminar').addEventListener('click', () => {
            eliminarInvitado(index);
            guardarEnStorage();
            actualizarInterfaz();
        });

        contenedorInvitados.appendChild(articulo);
    });
};

const renderizarResultadoPareja = () => {
    const pareja = encontrarPareja(invitados);

    if (pareja) {
        contenedorResultado.innerHTML = `
            <article class="receta-item" style="border-left: 5px solid #a56f48;">
                <h3>🎉 ¡Par encontrado!</h3>
                <p>Los primeros invitados consecutivos que pueden sentarse juntos son:</p>
                <p style="font-size: 1.3rem;"><strong>[ "${pareja[0]}", "${pareja[1]}" ]</strong></p>
                <p>Ambos nombres comienzan con la letra <strong>"${pareja[0].charAt(0).toUpperCase()}"</strong>.</p>
            </article>
        `;
    } else {
        contenedorResultado.innerHTML = `
            <article class="receta-item">
                <p>❌ No se encontró ninguna pareja de invitados consecutivos con la misma inicial.</p>
            </article>
        `;
    }
};

const actualizarInterfaz = () => {
    renderizarListaInvitados();
    renderizarResultadoPareja();
    ejecutarDemostracionConsola();
};

// Evento submit para agregar un invitado
formularioInvitados.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputNombre = document.getElementById('nombre-invitado');

    if (agregarInvitado(inputNombre.value)) {
        guardarEnStorage();
        actualizarInterfaz();
        formularioInvitados.reset();
    }
});

// Botón para restablecer la lista original
document.getElementById('boton-restablecer').addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    sincronizarLista();
    actualizarInterfaz();
});

// Inicialización de la app
const iniciarApp = () => {
    sincronizarLista();
    actualizarInterfaz();
};

iniciarApp();