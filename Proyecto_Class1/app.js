import { registrarDestino, mostrarItinerario, calcularCosto } from './viajes.js';

const formularioViaje = document.getElementById('formulario-viaje');
const contenerdorViajes = document.getElementById('contenedor-cotizacion-viajes');
const STORAGE_KEY = 'CotizarViajes';

function obtenerViajes() {
    const datos = localStorage.getItem(STORAGE_KEY);
    return datos ? JSON.parse(datos) : [];
}

function guardarViajes(viajes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(viajes));
}

function crearElementoViaje(viaje, index) {
    const articulo = document.createElement('article');
    articulo.className = 'viaje-item';

    articulo.innerHTML = `
        <div class="viaje-cabecera">
            <h3>Destino: ${viaje.destino}</h3>
            <button class="boton-eliminar" type="button">Eliminar</button>
        </div>
        <p><strong>Fecha y Hora:</strong> ${viaje.fechaHora}</p>
        <p><strong>Medio de Transporte:</strong> ${viaje.medioTransporte}</p>
        <p><strong>Costo estimado:</strong> $${viaje.costo}</p>
        <hr>
    `;

    const botonEliminar = articulo.querySelector('.boton-eliminar');
    botonEliminar.addEventListener('click', () => eliminarViaje(index));

    return articulo;
}

function eliminarViaje(index) {
    const viajes = obtenerViajes();
    viajes.splice(index, 1);
    guardarViajes(viajes);
    mostrarViajes();
}

function eliminarTodosViajes() {
    localStorage.removeItem(STORAGE_KEY);
    mostrarViajes();
}

function mostrarViajes() {
    const viajes = obtenerViajes();
    contenerdorViajes.innerHTML = '';

    if (viajes.length === 0) {
        const mensaje = document.createElement('p');
        mensaje.textContent = 'No hay viajes a cotizar aún.';
        contenerdorViajes.appendChild(mensaje);
        return;
    }

    viajes.forEach((viaje, index) => {
        contenerdorViajes.appendChild(crearElementoViaje(viaje, index));
    });
}

formularioViaje.addEventListener('submit', event => {
    event.preventDefault(); // Evita que la página se recargue al enviar

    const destino = document.getElementById('lugar-destino').value;
    const fechaHora = document.getElementById('fecha-hora').value;
    const medioTransporte = document.getElementById('medio-transporte').value;

    const nuevoViaje = {
        destino: destino,
        fechaHora: fechaHora,
        medioTransporte: medioTransporte,
        costo: calcularCosto(destino, medioTransporte)
    };

    const viajes = obtenerViajes();
    viajes.push(nuevoViaje);
    guardarViajes(viajes);
    mostrarViajes();
    formularioViaje.reset(); // Limpia el formulario
});

const botonEliminarTodas = document.getElementById('boton-eliminar-todas');
botonEliminarTodas.addEventListener('click', eliminarTodosViajes);

// Iniciar la aplicación
function iniciarApp() {
    // Ejemplo de cómo registrar destinos en consola
    registrarDestino("Paris", "2024-06-15", "Avión");
    registrarDestino("Londres", "2024-07-01", "Tren");

    // Mostrar el itinerario en la consola
    mostrarItinerario();

    // Renderizar los viajes guardados en el HTML
    mostrarViajes();
}

// Ejecutar la aplicación
iniciarApp();