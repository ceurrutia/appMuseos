const express = require('express');
const path = require('path');
const dbconnect = require('./config');
const ModelUser = require('./museumModel');
const app = express();

const PORT = process.env.PORT || 3000;

const router = express.Router();

//Rutas crud// 

//Get

router.get('/museos', async (req, res) => {
    const respuesta = await ModelUser.find({});
    res.send(respuesta)
});



router.get('/museos/:id', async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelUser.findById(id);
    res.send(respuesta)
});


//Create

router.post('/museos',  async (req, res)=> {
    const body = req.body;
    const respuesta = await  ModelUser.create(body);
    res.send(respuesta);
})

//PUT

router.put('/museos/:id', async (req, res)=>{
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelUser.findOneAndUpdate({_id:id}, body);
    res.send(respuesta)
})


//Delete

router.delete('/museos/:id', async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelUser.deleteOne({_id: id});
    res.send(respuesta)
});



app.use(express.json());
app.use(router);

// Servir archivos estáticos desde el directorio '/public'
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/listar_museo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'listar_museo.html'));
});
app.get('/agregar_museo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'agregar_museo.html'));
});

app.listen(process.env.PORT, ()=> {
    console.log(`Servidor escuchando en puerto ${PORT}`)
})

dbconnect();