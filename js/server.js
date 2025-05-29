require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar:', err));

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));
const Producto = require('./models/Producto');

app.use(express.json());

app.get('/productos', async (req, res) => {
    const productos = await Producto.find();
    res.json(productos);
});

app.post('/productos', async (req, res) => {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.json(nuevoProducto);
});