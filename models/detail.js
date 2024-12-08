const mongoose = require('mongoose');

const detalleSchema = new mongoose.Schema({
    num_detalle: { type: Number, required: true, unique: true},
    num_factura: { type: Number, ref: 'Factura', required: true },
    id_producto: { type: String, ref: 'Producto', required: true },
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: true },
});

module.exports = mongoose.model('Detalle', detalleSchema, 'detail');
