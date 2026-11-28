
const express = require("express");
const router = express.Router();

const incidenciaController = require("../controllers/incidenciaController");

router.get("/", incidenciaController.listar);
router.get("/:id", incidenciaController.consultar);
router.post("/", incidenciaController.registrar);
router.patch("/:id", incidenciaController.modificar);
router.delete("/:id", incidenciaController.borrar);

module.exports = router;
