const path = require('path');

module.exports = {
    PORT: process.env.PORT || 8080,
    SECRET_KEY: 'secretKey123',
    DB: 'mongodb+srv://admin:admin22@backvideoclub.nzmto.mongodb.net/DBappmovies?retryWrites=true&w=majority',
    PUBLIC: path.join(__dirname, 'bin') 
}