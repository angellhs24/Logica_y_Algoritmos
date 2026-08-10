import {
    numeros,
    numerosIniciales,
    findMax,
    agregarNumero,
    eliminarNumero,
    ejecutarDemostracionConsola
} from './maximo.js';

const formularioAgregar = document.getElementById('formulario-numero');
const contenedorResultado = document.getElementById('contenedor-resultado');
const contenedorLista = document.getElementById('contenedor-lista');
const STORAGE_KEY = 'ArregloDivideConquer';

const obtenerGuardados = () => {
    const datos = localStorage.getItem(STORAGE_KEY);
    return datos ? JSON.parse(datos) : null;
};

const guardarEnStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(numeros));
};

const sincronizarLista = () => {
    const guardados = obtenerGuardados();
    numeros.length = 0;
    if (guardados && guardados.length > 0) {
        numeros.push(...guardados);
    } else {
        numeros.push(...numerosIniciales);
    }
};

const renderizarLista = () => {
    contenedorLista.innerHTML = '';

    if (numeros.length === 0) {
        contenedorLista.innerHTML = '<p>El arreglo de números está vacío.</p>';
        return;
    }

    numeros.forEach((num, index) => {
        const articulo = document.createElement('article');
        articulo.className = 'receta-item';

        articulo.innerHTML = `
            <div class="receta-cabecera">
                <h3>Posición ${index}: <strong>${num}</strong></h3>
                <button class="boton-eliminar" type="button">Eliminar</button>
            </div>
        `;

        articulo.querySelector('.boton-eliminar').addEventListener('click', () => {
            eliminarNumero(index);
            guardarEnStorage();
            actualizarInterfaz();
        });

        contenedorLista.appendChild(articulo);
    });
};

const renderizarResultadoMaximo = () => {
    const maximo = findMax(numeros);

    if (maximo !== null) {
        contenedorResultado.innerHTML = `
            <article class="receta-item" style="border-left: 5px solid #a56f48;">
                <h3>📊 Número Máximo Encontrado:</h3>
                <p style="font-size: 1.8rem; margin: 0.5rem 0;">
                    <strong>${maximo}</strong>
                </p>
                <p>Calculado utilizando el algoritmo <em>Divide and Conquer</em>.</p>
            </article>
        `;
    } else {
        contenedorResultado.innerHTML = `
            <article class="receta-item">
                <p>⚠️ El arreglo está vacío, no se puede calcular el máximo.</p>
            </article>
        `;
    }
};

const actualizarInterfaz = () => {
    renderizarLista();
    renderizarResultadoMaximo();
    ejecutarDemostracionConsola(numeros);
};

// Formulario para añadir números al arreglo
formularioAgregar.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputNumero = document.getElementById('nuevo-numero');

    if (agregarNumero(inputNumero.value)) {
        guardarEnStorage();
        actualizarInterfaz();
        inputNumero.value = '';
    }
});

// Botón para restablecer el arreglo original [3, 8, 2, 10, 5, 7]
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