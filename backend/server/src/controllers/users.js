const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = require('../config').SECRET_KEY;

//Registrar un nuevo usuario
exports.signUpUser = async (req, res) => {
    try {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password), //Se encripta el password
            isadmin: req.body.isadmin,
            address: req.body.address,
            phone: req.body.phone
        }
        const user = new User(newUser);
        await user.save();
        res.status(200).json({
            msg: 'Usuario registrado con éxito!'
        })
        console.log('Usuario registrado con éxito!');

    } catch (err) {
        if (err && err.code === 11000){
            res.status(500).json({
                msg: 'El correo ya ha sido registrado'
            }) 
            console.log('El correo ya ha sido registrado');
        } 
    }
}

//Iniciar sesión 
exports.signInUser = async (req, res) => {
    const expiresIn = 28800; //Tiempo en segundos que expira el token (8 horas)
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if(!user) {
        res.status(400).json({ 
            msg : 'El correo no está registrado'
        });
        console.log('El correo no está registrado')
    } else {
        const validPassword = bcrypt.compareSync(password, user.password); //Se compara el password ingresado con el password encriptado
        if(!validPassword) {
            res.status(400).json({ 
                msg : 'Contraseña incorrecta'
            });
            console.log('Contraseña incorrecta')
        } else {
            const token = jwt.sign({ _id: user._id, isadmin: user.isadmin }, SECRET_KEY, { expiresIn: expiresIn });
            if(token) {
                res.status(200).json({
                    token: token,
                    isadmin: user.isadmin,
                    name: user.name,
                    email: user.email
                })
            }
            console.log(`Has iniciado sesión ${user.name}`);
        }
    }
}

//Obtener información del usuario
exports.getDataUser = async (req, res) => {
    let id = req.userData._id;
    const user = await User.findOne({ _id: id });
    if(!user) {
        res.send({ message: 'Usuario no encontrado' });
    } else {
        const expiresIn = 28800; //Tiempo en segundos que expira el token (8 horas)
        const token = jwt.sign({ id: user.id, isadmin: user.isadmin }, SECRET_KEY, { expiresIn: expiresIn });
        if(token) {
            const dataUser = {
                _id: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone,
                isadmin: user.isadmin
            }
            res.status(200).json({
                token: token,
                dataUser: dataUser
            })
        }
        console.log(`Se obtuvo los datos privados de ${user.name}`);
    }
}
