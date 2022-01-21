const mongoose = require('mongoose');
const dbURL = require('../config').DB;

const conectarDB = async () => {

    try {
        await mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Base de datos MongoDB conectada');

        process.on('SIGINT', () => {
            console.log('Cerrando conexión a la base de datos');
            mongoose.connection.close();
            process.exit(0);
        })

        process.on('exit', () => {
            console.log('Saliendo...');
        })
    } catch (error) {
        console.log('No se pudo conectar a la base de datos');
        process.exit(1);
    }

}

module.exports = conectarDB;