const express = require("express");
const {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  createProductoForm,
  getProductoEditForm
} = require("../controllers/productController");

const router = express.Router();

// Rutas para productos
router.get("/create", createProductoForm);  // Crear producto
router.get("/:id_producto/edit", getProductoEditForm); // Editar producto
router.get("/", getProductos); // Ver productos
router.get("/:id_producto", getProductoById); // Ver producto por ID
router.post("/", createProducto); // Crear producto
router.put("/:id_producto", updateProducto); // Actualizar producto
router.delete("/:id_producto", deleteProducto); // Eliminar producto

module.exports = router;
