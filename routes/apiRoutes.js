const express = require('express');
const ModelUser = require('../museumModel');
const router = express.Router();


// Rutas CRUD

// Obtener todos los museos
router.get('/museos', async (req, res) => {
    const respuesta = await ModelUser.find({});
    res.send(respuesta);
});

// Obtener un museo por su ID
router.get('/museos/:id', async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelUser.findById(id);
    res.send(respuesta);
});

// Crear un nuevo museo
router.post('/museos', async (req, res) => {
    const body = req.body;
    const respuesta = await ModelUser.create(body);
    res.send(respuesta);
});

// Actualizar un museo por su ID
router.put('/museos/:id', async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelUser.findOneAndUpdate({ _id: id }, body);
    res.send(respuesta);
});

// Eliminar un museo por su ID
router.delete('/museos/:id', async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelUser.deleteOne({ _id: id });
    res.send(respuesta);
});

module.exports = router;
