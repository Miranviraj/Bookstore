const express = require('express');
const Cart = require('../models/cart');
const router = express.Router();

router.post('/add', async (req, res) => {
    const { userId, book } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, books: [book] });
    } else {
        cart.books.push(book);
    }

    await cart.save();
    res.json({ message: "Book added to cart", cart });
});

router.get("/fetch/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;