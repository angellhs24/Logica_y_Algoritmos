import { findLongestWord, textoEjemplo, ejecutarDemostracionConsola } from './palabras.js';

const formularioTexto = document.getElementById('formulario-texto');
const campoTexto = document.getElementById('campo-texto');
const contenedorResultado = document.getElementById('contenedor-resultado');
const botonProbarEjemplo = document.getElementById('boton-ejemplo');

const procesarTexto = (texto) => {
    const palabraMasLarga = findLongestWord(texto);

    if (palabraMasLarga) {
        contenedorResultado.innerHTML = `
            <article class="receta-item" style="border-left: 5px solid #a56f48;">
                <h3>🔍 Palabra más larga encontrada:</h3>
                <p style="font-size: 1.5rem; margin: 0.5rem 0;">
                    <strong>"${palabraMasLarga}"</strong>
                </p>
                <p><strong>Longitud:</strong> ${palabraMasLarga.length} caracteres.</p>
            </article>
        `;
    } else {
        contenedorResultado.innerHTML = `
            <article class="receta-item">
                <p>⚠️ No se ingresó ningún texto válido para analizar.</p>
            </article>
        `;
    }

    ejecutarDemostracionConsola(texto);
};

// Evento submit del formulario
formularioTexto.addEventListener('submit', (e) => {
    e.preventDefault();
    procesarTexto(campoTexto.value);
});

// Cargar texto de ejemplo de las instrucciones
botonProbarEjemplo.addEventListener('click', () => {
    campoTexto.value = textoEjemplo;
    procesarTexto(textoEjemplo);
});

// Inicializar la app con el texto de ejemplo
const iniciarApp = () => {
    campoTexto.value = textoEjemplo;
    procesarTexto(textoEjemplo);
};

iniciarApp();