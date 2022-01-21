const express = require('express');
const conectDB = require('./database/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const orderRouter = require('./routes/orders');
const productRouter = require('./routes/products');
const userRouter = require('./routes/users');

//Creamos el servidor
const app = express();

//Conectamos a la Base de Datos
conectDB();

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());
app.use(express.static(config.PUBLIC));

app.use('/api/orders', orderRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

//Definimos ruta principal
app.get('/*', (req, res) => {
    res.sendFile(config.PUBLIC + '/index.html');
})

app.listen(config.PORT, ()=> {
    console.log(`El proyecto está corriendo perfectamente en http://localhost:${config.PORT}`);
})