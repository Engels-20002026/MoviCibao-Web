
const db = require("../config/database");

// Obtener todas las incidencias
async function obtenerTodas() {
    const [incidencias] = await db.query(
        "SELECT * FROM incidencias ORDER BY id DESC"
    );

    return incidencias;
}

// Obtener incidencia por ID
async function obtenerPorId(id) {
    const [incidencias] = await db.query(
        "SELECT * FROM incidencias WHERE id = ?",
        [id]
    );

    return incidencias[0];
}

// Crear incidencia
async function crear(datos) {
    const {
        rutaId,
        tipo,
        descripcion,
        gravedad,
        estado
    } = datos;

    const [resultado] = await db.query(
        `INSERT INTO incidencias
        (rutaId, tipo, descripcion, gravedad, estado)
        VALUES (?, ?, ?, ?, ?)`,
        [
            rutaId,
            tipo,
            descripcion,
            gravedad || "baja",
            estado || "activa"
        ]
    );

    return resultado.insertId;
}

// Actualizar incidencia
async function actualizar(id, datos) {
    const camposPermitidos = [
        "rutaId",
        "tipo",
        "descripcion",
        "gravedad",
        "estado"
    ];

    const campos = Object.keys(datos).filter(
        campo => camposPermitidos.includes(campo)
    );

    if (campos.length === 0) {
        return false;
    }

    const valores = campos.map(campo => datos[campo]);

    const sql = `UPDATE incidencias SET ${campos
        .map(campo => `\`${campo}\` = ?`)
        .join(", ")} WHERE id = ?`;

    const [resultado] = await db.query(sql, [...valores, id]);

    return resultado.affectedRows > 0;
}

// Eliminar incidencia
async function eliminar(id) {
    const [resultado] = await db.query(
        "DELETE FROM incidencias WHERE id = ?",
        [id]
    );

    return resultado.affectedRows > 0;
}

module.exports = {
    obtenerTodas,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};
