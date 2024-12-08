const Detalle = require("../models/detail");

exports.getDetalles = async (req, res) => {
  try {
    const detalles = await Detalle.find();
    res.status(200).json(detalles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};

exports.getDetallesById = async (req, res) => {
  try {
    const iddetail = req.params.num_detalle;

    const detalles = await Detalle.findOne({ num_detalle: iddetail });

    if (!detalles) {
      return res.status(404).json({ message: "Detalles no encontrados" });
    }

    res.status(200).json(detalles);
  } catch (err) {
    // En caso de error, responde con un estado 500
    res.status(500).json({ error: err.message });
  }
};

exports.createDetalles = async (req, res) => {
  try {
    const { num_detalle, num_factura, id_producto, cantidad, precio } = req.body;
    const nuevoDetalles = new Detalle({ num_detalle, num_factura, id_producto, cantidad, precio });
    await nuevoDetalles.save();
    res.status(201).json(nuevoDetalles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDetalles = async (req, res) => {
  try {
    const iddetail = req.params.num_detalle;

    const detalles = await Detalle.findOneAndUpdate(
      { num_detalle: iddetail },
      req.body,
      { new: true }
    );

    // Si no se encuentra, responde con un 404
    if (!detalles) return res.status(404).json({ message: "Detalles no encontrados" });

    // Responde con el cliente actualizado
    res.status(200).json(detalles);
  } catch (err) {
    // Manejo de errores
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDetalles = async (req, res) => {
  try {
    const iddetail = req.params.num_detalle;

    const detalles = await Detalle.findOneAndDelete({ num_detalle: iddetail });

    if (!detalles) return res.status(404).json({ message: "Detalles no encontrados" });

    // Responde con un mensaje de éxito
    res.status(200).json({ message: "Detalles eliminados" });
  } catch (err) {
    // Manejo de errores
    res.status(500).json({ error: err.message });
  }
};
