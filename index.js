const express = require('express');
const { dbConnection } = require('./db/config');
require('dotenv').config();



// Creat el servidor de express
const app = express();

//DB
dbConnection();

//Directorio Publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json())

//Rutas

app.use('/api/auth' , require('./routes/auth'))


//Escuchar peticiones
app.listen(process.env.PORT , () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}` )
})