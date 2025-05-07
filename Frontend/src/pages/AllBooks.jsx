import React, { useEffect, useState } from 'react';
import { searchGoogleBooks } from '../utils/googleBooks';
import { Link } from 'react-router-dom';

function AllBooks() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [cart, setCart] = useState([]);

  // Filter states
  const [priceFilter, setPriceFilter] = useState('all');
  const [forSaleOnly, setForSaleOnly] = useState(false);

  useEffect(() => {
    const loadDefaultBooks = async () => {
      const defaultBooks = await searchGoogleBooks('react');
      setResults(defaultBooks);
    };

    loadDefaultBooks();
  }, []);

  const searchBooks = async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    const books = await searchGoogleBooks(query);
    setResults(books);
  };

  const addToCart = (book) => {
    setCart((prev) => [...prev, book]);
    alert(`Added "${book.volumeInfo.title}" to cart.`);
  };

  const buyNow = (infoLink) => {
    window.open(infoLink, '_blank');
  };

  // Apply filters based on USD prices
  const filteredBooks = results.filter((book) => {
    const saleInfo = book.saleInfo;
    const price = saleInfo?.listPrice?.amount;
    const currency = saleInfo?.listPrice?.currencyCode;
    const isForSale = saleInfo?.saleability === 'FOR_SALE' && price && currency === 'USD';

    if (forSaleOnly && !isForSale) return false;

    if (priceFilter === 'free') {
      return !isForSale;
    } else if (priceFilter === 'under10') {
      return isForSale && price < 10;
    } else if (priceFilter === '10to30') {
      return isForSale && price >= 10 && price <= 30;
    } else if (priceFilter === 'above30') {
      return isForSale && price > 30;
    }

    return true;
  });

  return (
    <div className="p-6 min-h-screen bg-zinc-900 text-white">
      <h2 className="text-3xl mb-6 font-bold text-center text-orange-300">
        {isSearching ? 'Search Results' : 'All Books'}
      </h2>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        {/* Search Box */}
        <div className="flex w-full md:w-2/3 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search for books..."
            className="text-black p-3 w-full rounded-l-md"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={searchBooks}
            className="bg-blue-600 px-4 py-3 rounded-r-md hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {/* Filters Sidebar */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-end w-full md:w-auto">
          <div className="bg-zinc-800 p-4 rounded-md w-full max-w-xs">
            <h3 className="text-xl font-semibold text-center mb-4">Filters</h3>

            {/* Price Filter */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Price</label>
              <select
                className="w-full p-2 rounded-md text-black"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="all">All Prices</option>
                <option value="free">Free</option>
                <option value="under10">Under $10</option>
                <option value="10to30">$10 - $30</option>
                <option value="above30">Above $30</option>
              </select>
            </div>

            {/* For Sale Only Filter */}
            <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
              <input
                type="checkbox"
                checked={forSaleOnly}
                onChange={(e) => setForSaleOnly(e.target.checked)}
                className="text-blue-600"
              />
              <span>Only Show For Sale</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => {
            const volume = book.volumeInfo;
            const saleInfo = book.saleInfo;
            const price = saleInfo?.listPrice?.amount;
            const currency = saleInfo?.listPrice?.currencyCode;
            const isForSale = saleInfo?.saleability === 'FOR_SALE' && price && currency === 'USD';

            return (
              <Link
                to={`/book/${book.id}`}
                state={{ book }}
                key={book.id}
                className="bg-zinc-800 p-4 rounded shadow-md hover:shadow-lg flex flex-col justify-between"
              >
                <img
                  src={
                    volume.imageLinks?.thumbnail ||
                    'https://via.placeholder.com/150'
                  }
                  alt={volume.title}
                  className="w-full h-64 object-cover rounded mb-4"
                />
                <h3 className="text-xl font-semibold mb-1">{volume.title}</h3>
                <p className="text-sm text-gray-400 mb-1">
                  {volume.authors?.join(', ') || 'Unknown Author'}
                </p>
                <p className="text-sm mb-2">
                  {volume.description
                    ? volume.description.slice(0, 100) + '...'
                    : 'No description available.'}
                </p>

                {/* Display Price in USD */}
                <p className="text-orange-400 font-bold mb-2">
                  {isForSale && price
                    ? `$${price}`
                    : 'Free / Not for Sale'}
                </p>

                {isForSale && (
                <div className="mt-auto flex gap-2">
                <Link
                to={`/book/${book.id}`}
                state={{ book }}
                key={book.id}
                className="bg-zinc-800 p-4 rounded shadow-md hover:shadow-lg flex flex-col justify-between"
              >
                  <button
                  
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                  >
                    Buy
                  </button>
                  </Link>
                </div>
                )}
              </Link>
            );
          })
        ) : (
          <p className="text-center col-span-full text-gray-400">
            Books Loading
          </p>
        )}
      </div>
    </div>
  );
}

export default AllBooks;
