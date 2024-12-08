 const express = require("express");
const {
  getClientes,
  // getClienteById,
  createClienteForm, // Nueva función para renderizar el formulario
  createCliente,
  updateCliente,
  deleteCliente,
  getClienteEditForm,
  getClienteById
} = require("../controllers/clientController");

const router = express.Router();

// Rutas para renderizar los formularios de creación y edición
router.get("/create", createClienteForm);  // Ruta para mostrar el formulario de creación
router.get("/:id_client/edit", getClienteEditForm);  // Ruta para mostrar el formulario de edición

// Rutas específicas que operan sobre un cliente por su ID
router.get("/:id_client", getClienteById);  // Ruta para obtener un cliente específico por su ID
router.put("/:id_client", updateCliente);  // Ruta para actualizar un cliente por su ID
router.delete("/:id_client", deleteCliente);  // Ruta para eliminar un cliente por su ID

// Rutas generales 
router.get("/", getClientes);  // Ruta para obtener todos los clientes
router.post("/", createCliente);  // Ruta para crear un nuevo cliente

module.exports = router;
