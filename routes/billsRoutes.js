const express = require("express");
const {
  getFacturas,
  getFacturaById,
  createFactura,
  updateFactura,
  deleteFactura,
  createFacturaForm,
  getFacturaEditForm
} = require("../controllers/billController");

const router = express.Router();

// Rutas para renderizar los formularios de creación y edición
router.get("/create", createFacturaForm);  // Ruta para mostrar el formulario de creación
// router.get("/:id_client/edit", getClienteEditForm); 
router.get("/:num_factura/edit", getFacturaEditForm);
router.get("/", getFacturas);
router.get("/:num_factura", getFacturaById);
router.post("/", createFactura);
router.put("/:num_factura", updateFactura);
router.delete("/:num_factura", deleteFactura); 

module.exports = router;
