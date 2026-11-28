
const Incidencia = require("../models/incidenciaModel");

const gravedades = ["baja", "media", "alta"];
const estados = ["activa", "resuelta"];

// Validar ID
function validarId(id) {
    return /^\d+$/.test(id) && Number(id) > 0;
}

// GET: listar incidencias
async function listar(req, res) {
    try {
        const incidencias = await Incidencia.obtenerTodas();

        res.status(200).json(incidencias);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al consultar las incidencias"
        });
    }
}

// GET: consultar incidencia por ID
async function consultar(req, res) {
    try {
        if (!validarId(req.params.id)) {
            return res.status(400).json({
                mensaje: "Identificador inválido"
            });
        }

        const incidencia = await Incidencia.obtenerPorId(
            req.params.id
        );

        if (!incidencia) {
            return res.status(404).json({
                mensaje: "Incidencia no encontrada"
            });
        }

        res.status(200).json(incidencia);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al consultar la incidencia"
        });
    }
}

// POST: registrar incidencia
async function registrar(req, res) {
    try {
        const {
            rutaId,
            tipo,
            descripcion,
            gravedad,
            estado
        } = req.body;

        if (
            !Number.isInteger(rutaId) ||
            rutaId <= 0 ||
            typeof tipo !== "string" ||
            !tipo.trim() ||
            typeof descripcion !== "string" ||
            !descripcion.trim()
        ) {
            return res.status(400).json({
                mensaje: "Debes proporcionar rutaId, tipo y descripción válidos"
            });
        }

        if (
            gravedad !== undefined &&
            !gravedades.includes(gravedad)
        ) {
            return res.status(400).json({
                mensaje: "Gravedad inválida"
            });
        }

        if (
            estado !== undefined &&
            !estados.includes(estado)
        ) {
            return res.status(400).json({
                mensaje: "Estado inválido"
            });
        }

        const id = await Incidencia.crear({
            rutaId,
            tipo: tipo.trim(),
            descripcion: descripcion.trim(),
            gravedad,
            estado
        });

        res.status(201).json({
            mensaje: "Incidencia registrada correctamente",
            id
        });

    } catch (error) {
        console.error(error);

        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({
                mensaje: "La ruta indicada no existe"
            });
        }

        res.status(500).json({
            mensaje: "Error al registrar la incidencia"
        });
    }
}

// PATCH: actualizar incidencia
async function modificar(req, res) {
    try {
        if (!validarId(req.params.id)) {
            return res.status(400).json({
                mensaje: "Identificador inválido"
            });
        }

        const datos = req.body;

        const permitidos = [
            "rutaId",
            "tipo",
            "descripcion",
            "gravedad",
            "estado"
        ];

        const campos = Object.keys(datos);

        if (
            campos.length === 0 ||
            campos.some(campo => !permitidos.includes(campo))
        ) {
            return res.status(400).json({
                mensaje: "Datos vacíos o campos no permitidos"
            });
        }

        if (
            datos.rutaId !== undefined &&
            (!Number.isInteger(datos.rutaId) || datos.rutaId <= 0)
        ) {
            return res.status(400).json({
                mensaje: "rutaId inválido"
            });
        }

        if (
            datos.tipo !== undefined &&
            (typeof datos.tipo !== "string" || !datos.tipo.trim())
        ) {
            return res.status(400).json({
                mensaje: "Tipo inválido"
            });
        }

        if (
            datos.descripcion !== undefined &&
            (typeof datos.descripcion !== "string" ||
                !datos.descripcion.trim())
        ) {
            return res.status(400).json({
                mensaje: "Descripción inválida"
            });
        }

        if (
            datos.gravedad !== undefined &&
            !gravedades.includes(datos.gravedad)
        ) {
            return res.status(400).json({
                mensaje: "Gravedad inválida"
            });
        }

        if (
            datos.estado !== undefined &&
            !estados.includes(datos.estado)
        ) {
            return res.status(400).json({
                mensaje: "Estado inválido"
            });
        }

        if (datos.tipo !== undefined) {
            datos.tipo = datos.tipo.trim();
        }

        if (datos.descripcion !== undefined) {
            datos.descripcion = datos.descripcion.trim();
        }

        const actualizado = await Incidencia.actualizar(
            req.params.id,
            datos
        );

        if (!actualizado) {
            return res.status(404).json({
                mensaje: "Incidencia no encontrada"
            });
        }

        res.status(200).json({
            mensaje: "Incidencia actualizada correctamente"
        });

    } catch (error) {
        console.error(error);

        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({
                mensaje: "La ruta indicada no existe"
            });
        }

        res.status(500).json({
            mensaje: "Error al actualizar la incidencia"
        });
    }
}

// DELETE: eliminar incidencia
async function borrar(req, res) {
    try {
        if (!validarId(req.params.id)) {
            return res.status(400).json({
                mensaje: "Identificador inválido"
            });
        }

        const eliminado = await Incidencia.eliminar(
            req.params.id
        );

        if (!eliminado) {
            return res.status(404).json({
                mensaje: "Incidencia no encontrada"
            });
        }

        res.status(200).json({
            mensaje: "Incidencia eliminada correctamente"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al eliminar la incidencia"
        });
    }
}

module.exports = {
    listar,
    consultar,
    registrar,
    modificar,
    borrar
};
