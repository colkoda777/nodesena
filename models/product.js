const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    id_producto: { type: Number, required: true, unique: true},
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    id_categoria: { type: String, ref: 'Categoria', required: true },
});

module.exports = mongoose.model('Producto', productoSchema, 'product');
