const Order = require('../models/order');

//Obtener todos o un pedido por Id
exports.getOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const orders = await Order.find(id? { _id: id } : {});
        res.json(orders)
        console.log(`Se obtuvo ${ id? 'la orden' : 'las ordenes' }`);

    } catch (err) {
        console.log('Hubo un error');
        res.status(500).send('Hubo un error');
    }
}

//Crear un nuevo pedido
exports.createOrder = async (req, res) => {
    try {
        const newOrder = req.body;
        const order = new Order(newOrder);

        await order.save();
        res.send(order);
        console.log('Nueva orden creada');

    } catch (err) {
        console.log('Hubo un error');
        res.status(500).send('Hubo un error');
    }
}
