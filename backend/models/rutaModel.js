
const db = require("../config/database");

// Obtener todas las rutas
async function obtenerTodas() {
    const [rutas] = await db.query("SELECT * FROM rutas");
    return rutas;
}

// Obtener una ruta por ID
async function obtenerPorId(id) {
    const [rutas] = await db.query(
        "SELECT * FROM rutas WHERE id = ?",
        [id]
    );

    return rutas[0];
}

// Crear una ruta
async function crear(datos) {
    const { origen, destino, duracionEstimada, distanciaKm, estado } = datos;

    const [resultado] = await db.query(
        `INSERT INTO rutas
        (origen, destino, duracionEstimada, distanciaKm, estado)
        VALUES (?, ?, ?, ?, ?)`,
        [origen, destino, duracionEstimada, distanciaKm ?? null, estado || "normal"]
    );

    return resultado.insertId;
}

// Actualizar una ruta
async function actualizar(id, datos) {
    const camposPermitidos = [
        "origen",
        "destino",
        "duracionEstimada",
        "distanciaKm",
        "estado"
    ];

    const campos = Object.keys(datos).filter(
        campo => camposPermitidos.includes(campo)
    );

    if (campos.length === 0) {
        return false;
    }

    const valores = campos.map(campo => datos[campo]);

    const sql = `UPDATE rutas SET ${campos.map(campo => `\`${campo}\` = ?`).join(", ")} WHERE id = ?`;

    const [resultado] = await db.query(sql, [...valores, id]);

    return resultado.affectedRows > 0;
}

// Eliminar una ruta
async function eliminar(id) {
    const [resultado] = await db.query(
        "DELETE FROM rutas WHERE id = ?",
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
