const express = require('express');
const order = require('../models/order')
const Cart = require('../models/cart');
const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const { userId } = req.body;

        const cart = await cart.findOne({ userId });
        if (!cart || cart.books.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const totalPrice = cart.books.reduce((acc, book) => acc + book.price * book.quantity, 0);

        const newOrder = new OrderModel({
            userId,
            books: cart.books,
            orderDate: new Date(),
            totalPrice,
        });

        await newOrder.save();

        // Optionally clear cart
        await cart.deleteOne({ userId });

        res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;