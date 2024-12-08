const mongoose = require('mongoose');

const facturaSchema = new mongoose.Schema({
    num_factura: { type: Number, require: true, unique: true },
    id_cliente: { type: Number, ref: 'Cliente', require: true},
    fecha: { type: Date, required: true},
    num_pago: {type: Number, required: true}

});

module.exports = mongoose.model('Factura', facturaSchema, 'bill');
