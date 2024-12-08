const express = require("express");
const {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
  createCategoryForm,
  getCategoriaEditForm,
} = require("../controllers/categoryController");

const router = express.Router();

// Rutas para renderizar los formularios de creación y edición
router.get("/create", createCategoryForm);  // Ruta para mostrar el formulario de creación
router.get("/:id_categoria/edit", getCategoriaEditForm);  // Ruta para mostrar el formulario de edición

// Rutas específicas que operan sobre una categoría por su ID
router.get("/:id_categoria", getCategoriaById);  // Ruta para obtener una categoría específica por su ID
router.put("/:id_categoria", updateCategoria);  // Ruta para actualizar una categoría por su ID
router.delete("/:id_categoria", deleteCategoria);  // Ruta para eliminar una categoría por su ID

// Rutas generales
router.get("/", getCategorias);  // Ruta para obtener todas las categorías
router.post("/", createCategoria);  // Ruta para crear una nueva categoría

module.exports = router;
