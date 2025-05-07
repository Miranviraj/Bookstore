const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: String,
    books: [
        {
            title: String,
            price: Number,
            quantity: Number,
            thumbnail: String
        }
    ],
    totalPrice: Number,
    orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);