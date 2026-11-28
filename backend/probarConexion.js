
const db = require("./config/database");

async function probarConexion() {
    try {
        const conexion = await db.getConnection();

        console.log("¡Conexión con MySQL exitosa!");

        const [resultado] = await conexion.query(
            "SELECT DATABASE() AS baseDatos"
        );

        console.log("Base de datos:", resultado[0].baseDatos);

        conexion.release();
        await db.end();

    } catch (error) {
        console.error("Error al conectar con MySQL:", error.message);
        await db.end();
    }
}

probarConexion();
