import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const book = location.state?.book;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user); 
  if (!book) {
    return <div className="p-6 text-white">Book not found.</div>;
  }

  const volume = book.volumeInfo;

  const addToCart = async () => {
    await axios.post("http://localhost:1000/api/v1/add", {
        userId: user.id, 
        book: {
            bookId: book.id,
            title: volume.title,
            price: Math.floor(Math.random() * 50 + 10),
            quantity: 1,
            thumbnail: volume.imageLinks?.thumbnail || ''
        }
    }, {
        headers: { Authorization: `Bearer ${user.token}` }
    });
    alert("Book added to cart!");
};

const buyNow = async () => {
    await axios.post("http://localhost:1000/api/v1/create", { userId: user.id }, {
        headers: { Authorization: `Bearer ${user.token}` }
    });
    alert("Order placed successfully!");
};

  

  

  return (
    <div className="p-6 text-white bg-zinc-900 min-h-screen">
      <div className="max-w-4xl mx-auto bg-zinc-800 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-orange-300">{volume.title}</h1>
        <img
          src={volume.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
          alt={volume.title}
          className="w-60 h-auto mb-4 rounded"
        />
        <p className="text-lg font-semibold text-gray-300 mb-2">
          Authors: {volume.authors?.join(', ') || 'Unknown'}
        </p>
        <p className="text-sm mb-4 text-gray-400">{volume.description || 'No description available.'}</p>
        <p className="text-sm text-gray-400">Published: {volume.publishedDate || 'N/A'}</p>
        <p className="text-sm text-gray-400">Pages: {volume.pageCount || 'N/A'}</p>

        {isLoggedIn && (
          <div className="mt-6 flex gap-4">
            <button
              onClick={addToCart}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
            <button
              onClick={buyNow}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
            >
              Buy Now
            </button>
          </div>
        )}

        {!isLoggedIn && (
          <a
            href={volume.infoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
          >
            View on Google Books
          </a>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
