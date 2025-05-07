// src/pages/DiscoverBooks.jsx
import React, { useState } from 'react';
import BannerImage from '../assets/home.png';
import { searchGoogleBooks } from '../utils/googleBooks';

function DiscoverBooks() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [cart, setCart] = useState([]);

  const searchBooks = async () => {
    const books = await searchGoogleBooks(query);
    setResults(books);
  };

  const addToCart = (book) => {
    setCart((prevCart) => [...prevCart, book]);
    alert(`Added "${book.volumeInfo.title}" to cart.`);
  };

  const buyNow = (infoLink) => {
    window.open(infoLink, '_blank');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Search Google Books</h1>

      {/* Search Bar */}
      <div className="flex mb-10">
        <input
          className="text-black p-2 flex-grow"
          placeholder="Search books..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchBooks} className="ml-2 px-4 bg-blue-600 text-white">
          Search
        </button>
      </div>

      {/* Search Results */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((book) => (
          <div key={book.id} className="bg-white text-black p-4 rounded shadow">
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt={book.volumeInfo.title}
              className="w-full h-48 object-cover mb-2"
            />
            <h2 className="text-lg font-semibold">{book.volumeInfo.title}</h2>
            <p className="text-sm mb-2">{book.volumeInfo.authors?.join(', ')}</p>
            <div className="flex gap-2">
              <button
                className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-sm"
                onClick={() => addToCart(book)}
              >
                Add to Cart
              </button>
              <button
                className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 text-sm"
                onClick={() => buyNow(book.volumeInfo.infoLink)}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiscoverBooks;
