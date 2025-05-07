const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: String,
    books: [
        {
            bookId: String,
            title: String,
            price: Number,
            quantity: Number,
            thumbnail: String
        }
    ]
});

module.exports = mongoose.model('Cart', cartSchema);