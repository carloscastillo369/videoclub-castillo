const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    id_item: String,
    user: Object,
    order: Array
}, { 
    versionKey: false
});

module.exports = mongoose.model('orders', orderSchema);