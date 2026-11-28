
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Importar rutas
const rutas = require("./routes/rutas");
const incidencias = require("./routes/incidencias");

// Ruta principal
app.get("/", (req, res) => {
    res.json({
        mensaje: "API REST de MoviCibao funcionando correctamente",
        estado: "Activo"
    });
});

// Endpoint de rutas
app.use("/api/rutas", rutas);
app.use("/api/incidencias", incidencias);

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
