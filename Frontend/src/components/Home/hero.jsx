import React, { useState } from 'react';
import BannerImage from '../../assets/home.png';
import { searchGoogleBooks } from '../../utils/googleBooks';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Hero() {
  const navigate = useNavigate(); 
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [cart, setCart] = useState([]);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const searchBooks = async () => {
    const books = await searchGoogleBooks(query);
    setResults(books);
  };

  const addToCart = (book) => {
    setCart((prevCart) => [...prevCart, book]);
    alert(`Added "${book.volumeInfo.title}" to cart.`);
  };

  const buyNow = (infoLink) => {
    window.open(infoLink, '_blank'); // Opens Google Book preview page
  };

  const handleDiscoverClick = () => {
    if (isLoggedIn) {
      navigate('/all-books');
    } else {
      navigate('/discover-books');
    }
  };

  return (
    <div className="p-4 mt-0">
      {/* Hero Section */}
      <div className=" mt-1 mb-11 flex flex-col-reverse lg:flex-row items-center justify-center min-h-screen gap-10">
        <div className=" mt-3 w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left px-4">
          <h1 className="text-3xl lg:text-6xl font-semibold text-orange-200 hover:text-orange-300 mt-3">
            Uncover Hidden Worlds Between the Covers
          </h1>
          <p className="mt-5 text-base lg:text-xl text-zinc-300">
            "Discover a world of stories. Find your next favorite book today.
            <br />
            From classics to new releases – read, explore, and enjoy every page."
          </p>
          <div className="mt-10">
            <button
              onClick={handleDiscoverClick}
              className="px-10 lg:px-20 py-3 border border-orange-500 text-orange-200 font-semibold
                hover:shadow-md hover:shadow-orange-300 transition
                hover:bg-orange-500 hover:text-zinc-900 rounded-full text-xl lg:text-2xl"
            >
              Discover Books
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center px-4">
          <img src={BannerImage} alt="Book Banner" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
