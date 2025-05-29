const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    descripcion: String
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;