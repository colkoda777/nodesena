const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    id_client: { type: Number, required: true, unique: true},
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    direccion: { type: String, required: true },
    fecha_nacimiento: { type: Date, required: true },
    telefono: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Cliente', clienteSchema, 'client');
