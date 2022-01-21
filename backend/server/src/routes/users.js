//Rutas para usuarios
const express = require('express');
const jwt = require('jsonwebtoken');
const userRouter = express.Router();
const userController = require('../controllers/users');
const SECRET_KEY = require('../config').SECRET_KEY;

//Ruta protegida
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log('Token no válida');
                res.send({ mensaje: 'Token no válida' });
            } else {
                req.userData = decoded;
                console.log(req.userData);
                console.log('Token OK.');
                next();
            }
        });

    } catch (err) {
        res.status(401).json({
          msg: "Token no provista"
        });
        console.log('Token no provista');
    }
}

// api/usuarios
userRouter.post('/signup', userController.signUpUser);
userRouter.post('/signin', userController.signInUser);
userRouter.get('/getdata', verifyToken, userController.getDataUser);

module.exports = userRouter;
