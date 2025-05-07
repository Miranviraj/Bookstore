import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const BuyNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;
  const userId = useSelector((state) => state.auth.user._id); // Assuming user._id is stored
  const token = useSelector((state) => state.auth.token); // JWT token

  if (!book) {
    return <div className="text-white p-6">No book selected for purchase.</div>;
  }

  const handleConfirmPurchase = async () => {
    try {
      const response = await axios.post(
        'http://localhost:1000/api/v1/create',
        {
          book: {
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors?.[0] || 'Unknown',
            image: book.volumeInfo.imageLinks?.thumbnail || '',
            infoLink: book.volumeInfo.infoLink,
            price: Math.floor(Math.random() * 50 + 10), // Random or fixed price logic
          },
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Order placed successfully!');
      navigate('/orders'); // Redirect to order history
    } catch (error) {
      console.error(error);
      alert('Failed to place order.');
    }
  };

  return (
    <div className="p-6 min-h-screen bg-zinc-900 text-white">
      <div className="max-w-2xl mx-auto bg-zinc-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-orange-400 mb-4">Confirm Purchase</h2>
        <img
          src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
          alt={book.volumeInfo.title}
          className="w-40 mb-4 rounded"
        />
        <p className="text-lg font-semibold">{book.volumeInfo.title}</p>
        <p className="text-sm text-gray-300 mb-2">Author: {book.volumeInfo.authors?.join(', ')}</p>
        <p className="text-sm text-gray-300 mb-4">Price: $ {Math.floor(Math.random() * 50 + 10)}</p>
        <button
          onClick={handleConfirmPurchase}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
        >
          Confirm Purchase
        </button>
      </div>
    </div>
  );
};

export default BuyNow;
