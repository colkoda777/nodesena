const express = require("express");
const {
  getDetalles,
  getDetallesById,
  createDetalles,
  updateDetalles,
  deleteDetalles
} = require("../controllers/detailController");

const router = express.Router();

router.get("/", getDetalles);
router.get("/:num_detalle", getDetallesById);
router.post("/", createDetalles);
router.put("/:num_detalle", updateDetalles);
router.delete("/:num_detalle", deleteDetalles); 

module.exports = router;
