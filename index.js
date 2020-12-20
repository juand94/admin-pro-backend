require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbconnection } = require('./database/config');

// juand
// JCglEJiKHWMLkudA
// Crear el Servidor express
const app = express();

// Configurar CORS
app.use(cors());

// Base de Datos
dbconnection();
//console.log(process.env);

// Rutas
app.get('/', (req, res) => {

    // res.status(400).json({
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });

});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})