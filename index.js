require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');

const { dbconnection } = require('./database/config');

// juand
// JCglEJiKHWMLkudA
// Crear el Servidor express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de Datos
dbconnection();
//console.log(process.env);

// Directorio publico
app.use(express.static('public'));

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));

// Lo ultimo
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

//app.get('/', (req, res) => {

// res.status(400).json({
//    res.json({
//        ok: true,
//        msg: 'Hola Mundo'
//    });

//});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})