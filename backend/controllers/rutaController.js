
const Ruta = require("../models/rutaModel");

// GET: consultar todas las rutas
async function listar(req, res) {
    try {
        const rutas = await Ruta.obtenerTodas();
        res.status(200).json(rutas);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al consultar las rutas" });
    }
}

// GET: consultar una ruta
async function consultar(req, res) {
    try {
        const ruta = await Ruta.obtenerPorId(req.params.id);

        if (!ruta) {
            return res.status(404).json({
                mensaje: "Ruta no encontrada"
            });
        }

        res.status(200).json(ruta);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al consultar la ruta" });
    }
}

// POST: crear una ruta
async function registrar(req, res) {
    try {
        const { origen, destino, duracionEstimada, distanciaKm, estado } = req.body;

        if (
            typeof origen !== "string" || !origen.trim() ||
            typeof destino !== "string" || !destino.trim() ||
            !Number.isInteger(duracionEstimada) || duracionEstimada <= 0
        ) {
            return res.status(400).json({
                mensaje: "Origen, destino y duración estimada válida son obligatorios"
            });
        }

        if (
            distanciaKm !== undefined &&
            distanciaKm !== null &&
            (!Number.isFinite(Number(distanciaKm)) || Number(distanciaKm) < 0)
        ) {
            return res.status(400).json({
                mensaje: "La distancia debe ser un número positivo"
            });
        }

        if (
            estado !== undefined &&
            !["normal", "congestionada", "cerrada"].includes(estado)
        ) {
            return res.status(400).json({
                mensaje: "Estado de ruta inválido"
            });
        }

        const id = await Ruta.crear({
            origen: origen.trim(),
            destino: destino.trim(),
            duracionEstimada,
            distanciaKm,
            estado
        });

        res.status(201).json({
            mensaje: "Ruta creada correctamente",
            id
        });

    } catch (error) {
        res.status(500).json({ mensaje: "Error al registrar la ruta" });
    }
}

// PATCH: actualizar una ruta
async function modificar(req, res) {
    try {
        const { origen, destino, duracionEstimada, distanciaKm, estado } = req.body;

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                mensaje: "Debes proporcionar datos para actualizar"
            });
        }

        if (
            (origen !== undefined && (typeof origen !== "string" || !origen.trim())) ||
            (destino !== undefined && (typeof destino !== "string" || !destino.trim())) ||
            (duracionEstimada !== undefined &&
                (!Number.isInteger(duracionEstimada) || duracionEstimada <= 0)) ||
            (distanciaKm !== undefined && distanciaKm !== null &&
                (!Number.isFinite(Number(distanciaKm)) || Number(distanciaKm) < 0)) ||
            (estado !== undefined &&
                !["normal", "congestionada", "cerrada"].includes(estado))
        ) {
            return res.status(400).json({
                mensaje: "Los datos proporcionados no son válidos"
            });
        }

        const actualizado = await Ruta.actualizar(req.params.id, {
            ...req.body,
            ...(origen !== undefined ? { origen: origen.trim() } : {}),
            ...(destino !== undefined ? { destino: destino.trim() } : {})
        });

        if (!actualizado) {
            return res.status(404).json({
                mensaje: "Ruta no encontrada o sin cambios"
            });
        }

        res.status(200).json({
            mensaje: "Ruta actualizada correctamente"
        });

    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar la ruta" });
    }
}

// DELETE: eliminar una ruta
async function borrar(req, res) {
    try {
        const eliminado = await Ruta.eliminar(req.params.id);

        if (!eliminado) {
            return res.status(404).json({
                mensaje: "Ruta no encontrada"
            });
        }

        res.status(200).json({
            mensaje: "Ruta eliminada correctamente"
        });

    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la ruta" });
    }
}

module.exports = {
    listar,
    consultar,
    registrar,
    modificar,
    borrar
};
