
const express = require("express");
const router = express.Router();

const rutaController = require("../controllers/rutaController");

router.get("/", rutaController.listar);
router.get("/:id", rutaController.consultar);
router.post("/", rutaController.registrar);
router.patch("/:id", rutaController.modificar);
router.delete("/:id", rutaController.borrar);

module.exports = router;
