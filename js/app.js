

// Obtener elementos del HTML
const origenInput = document.getElementById("origen");
const destinoInput = document.getElementById("destino");
const buscarBoton = document.getElementById("buscarRuta");
const resultadoRuta = document.getElementById("resultadoRuta");

// Escuchar el clic del botón
buscarBoton.addEventListener("click", function () {

    // Obtener los valores ingresados
    const origen = origenInput.value.trim();
    const destino = destinoInput.value.trim();

    // Validar que los campos no estén vacíos
    if (origen === "" || destino === "") {
        resultadoRuta.innerHTML = `
            <div class="route-message error">
                <strong>Atención:</strong>
                Debes ingresar el punto de partida y el destino.
            </div>
        `;
        return;
    }

    // Validar que origen y destino sean diferentes
    if (origen.toLowerCase() === destino.toLowerCase()) {
        resultadoRuta.innerHTML = `
            <div class="route-message error">
                El origen y el destino deben ser diferentes.
            </div>
        `;
        return;
    }

    // Mostrar el resultado de la consulta
    resultadoRuta.innerHTML = `
        <div class="route-message success">
            <h3>¡Consulta realizada correctamente!</h3>

            <div class="route-details">
                <p><strong>Origen:</strong> ${escapeHTML(origen)}</p>
                <p><strong>Destino:</strong> ${escapeHTML(destino)}</p>
            </div>

            <p>
                Tu búsqueda ha sido registrada en esta demostración.
                Próximamente podrás consultar alternativas,
                tiempos estimados e incidencias de transporte.
            </p>
        </div>
    `;

});

// Evitar interpretar el texto ingresado como HTML
function escapeHTML(texto) {
    const elemento = document.createElement("div");
    elemento.textContent = texto;
    return elemento.innerHTML;
}


// =====================================
// MOVICIBAO - SISTEMA DE INCIDENCIAS
// =====================================

const formularioReporte = document.getElementById("formReporte");
const listaReportes = document.getElementById("listaReportes");
const mensajeReporte = document.getElementById("mensajeReporte");

// Recuperar reportes guardados
let reportes = [];

try {
    reportes = JSON.parse(
        localStorage.getItem("movicibao_reportes")
    ) || [];

    if (!Array.isArray(reportes)) {
        reportes = [];
    }
} catch (error) {
    reportes = [];
}

// Mostrar reportes en pantalla
function mostrarReportes() {

    if (reportes.length === 0) {
        listaReportes.innerHTML = `
            <p class="empty-reports">
                Todavía no hay reportes publicados.
            </p>
        `;
        return;
    }

    listaReportes.innerHTML = reportes.map(reporte => `
        <article class="report-card">
            <h4>${escapeHTML(reporte.tipo)}</h4>

            <p>
                <strong>Ubicación:</strong>
                ${escapeHTML(reporte.ubicacion)}
            </p>

            <p>${escapeHTML(reporte.descripcion)}</p>

            <small>
                Publicado: ${escapeHTML(reporte.fecha)}
            </small>
        </article>
    `).join("");
}

// Publicar un nuevo reporte
formularioReporte.addEventListener("submit", function(event) {

    event.preventDefault();

    const tipo = document.getElementById("tipoIncidencia").value;
    const ubicacion = document.getElementById("ubicacionIncidencia").value.trim();
    const descripcion = document.getElementById("descripcionIncidencia").value.trim();

    if (!tipo || !ubicacion || !descripcion) {
        mensajeReporte.textContent = "Completa todos los campos.";
        mensajeReporte.className = "error";
        return;
    }

    const nuevoReporte = {
        tipo: tipo,
        ubicacion: ubicacion,
        descripcion: descripcion,
        fecha: new Date().toLocaleString("es-DO")
    };

    reportes.unshift(nuevoReporte);

    try {
        localStorage.setItem(
            "movicibao_reportes",
            JSON.stringify(reportes)
        );
    } catch (error) {
        reportes.shift();
        mensajeReporte.textContent =
            "No se pudo guardar el reporte en este navegador.";
        mensajeReporte.className = "error";
        return;
    }

    mostrarReportes();

    formularioReporte.reset();

    mensajeReporte.textContent = "¡Reporte publicado correctamente!";
    mensajeReporte.className = "success";

});

// Mostrar los reportes al abrir la página
mostrarReportes();

