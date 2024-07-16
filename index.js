
const path = require('path');
const express = require('express');
const dbconnect = require('./config');
const apiRoutes = require('./routes/apiRoutes');
const { appendFile } = require('fs');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(apiRoutes); 
app.use(express.static('public'));

//rutas listar

app.get('/', (req, res) => {
    res.send("Home API")
});

app.get('/listar_museo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'listar_museo.html'));
});

app.get('/agregar_museo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'agregar_museo.html'));
});

app.get('/editar_museo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'editar_museo.html'));
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});

dbconnect();