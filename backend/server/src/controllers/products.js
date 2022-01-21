const Product = require('../models/product');

//Obtener todos los productos o un producto por Id
exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const products = await Product.find(id? { _id: id } : {});
        res.json(products)
        console.log(`Se obtuvo ${ id? 'el producto' : 'los productos' }`);

    } catch (err) {
        console.log('Hubo un error');
        res.status(500).send('Hubo un error');
    }
}

//Crear un nuevo producto
exports.createProduct = async (req, res) => {
    try {
        const newProduct = req.body;
        const product = new Product(newProduct);

        await product.save();
        res.send(product);
        console.log('Nuevo producto creado');

    } catch (err) {
        console.log('Hubo un error');
        res.status(500).send('Hubo un error');
    }
}

//Actualizar un producto
exports.updateProduct = async (req, res) => {
    try {
        const product = req.body;
        const { id } = req.params;
    
        const updatedProduct = await Product.findByIdAndUpdate( { _id: id }, product, { new: true })
        res.json(updatedProduct);
        console.log('Producto actualizado');

    } catch (err) {
        console.log('Hubo un error');
        res.status(500).send('Hubo un error');
    }
}

//Eliminar un producto
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        await Product.findByIdAndRemove({ _id: id });
        res.json({ msg: 'Producto eliminado' });
        console.log('Producto eliminado');

    } catch (err) {
        console.log('Hubo un error');
        res.status(500).send('Hubo un error');
    }
}