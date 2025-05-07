import React, { useState } from 'react';

const CartPage = () => {
  const cartItems = [
    {
      _id: '1',
      title: 'The Great Gatsby',
      authors: ['F. Scott Fitzgerald'],
      price: 10.99,
    },
    {
      _id: '2',
      title: 'To Kill a Mockingbird',
      authors: ['Harper Lee'],
      price: 8.49,
    },
  ];

  const [selectedBook, setSelectedBook] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handleBuyNow = (item) => {
    setSelectedBook(item);
    setShowForm(true);
    setShowConfirmation(false);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
    setShowConfirmation(true);
  };

  return (
    <div className="p-6 text-white bg-zinc-900 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-400 mb-6">🛒 Your Cart</h1>

      {!showForm && !showConfirmation && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-zinc-800 p-4 rounded-lg shadow-md hover:shadow-orange-500/20 transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
              <p className="text-sm text-gray-300 mb-1">
                Author: {item.authors.join(', ')}
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Price: <span className="text-orange-400 font-semibold">${item.price}</span>
              </p>

              <div className="flex gap-2">
                <button
                  className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-white w-full"
                  onClick={() => handleBuyNow(item)}
                >
                  Buy Now
                </button>
                <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white w-full">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!showForm && !showConfirmation && (
        <div className="bg-zinc-800 p-6 rounded-lg max-w-md mx-auto text-center">
          <h2 className="text-xl font-bold mb-4">🧾 Order Summary</h2>
          <p>Total Items: {cartItems.length}</p>
          <p>
            Total Price:{' '}
            <span className="text-orange-400 font-bold">
              ${cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
            </span>
          </p>
        </div>
      )}

      {/* Checkout Form */}
      {showForm && selectedBook && (
        <div className="bg-zinc-800 p-6 rounded-lg max-w-md mx-auto mt-10">
          <h2 className="text-xl font-bold mb-4">Checkout - {selectedBook.title}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-2 rounded bg-zinc-700 text-white"
              required
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-2 rounded bg-zinc-700 text-white"
              required
              onChange={handleInputChange}
            />
            <textarea
              name="address"
              placeholder="Your Address"
              className="w-full p-2 rounded bg-zinc-700 text-white"
              required
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white w-full"
            >
              Place Order
            </button>
          </form>
        </div>
      )}

      {/* Order Confirmation */}
      {showConfirmation && selectedBook && (
        <div className="bg-zinc-800 p-6 rounded-lg max-w-md mx-auto mt-10 text-center">
          <h2 className="text-xl font-bold text-green-400 mb-4">✅ Order Placed Successfully!</h2>
          <p className="mb-2">Thank you, <strong>{formData.name}</strong>!</p>
          <p>You have purchased <strong>{selectedBook.title}</strong> by {selectedBook.authors.join(', ')}.</p>
          <p className="text-orange-400 mt-2">Amount Paid: ${selectedBook.price}</p>
        </div>
      )}
    </div>
  );
};

export default CartPage;
