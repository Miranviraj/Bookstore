import React from 'react';

function About() {
  return (
    <div className="bg-zinc-800 min-h-screen py-12 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-zinc-700 shadow-2xl rounded-2xl p-10">
        <h2 className="text-4xl font-bold text-center text-orange-300 mb-6">About Us</h2>
        <p className="text-white text-lg leading-relaxed mb-8 text-center">
          Welcome to <span className="font-semibold text-orange-200">BookHub</span> — your one-stop destination for discovering, purchasing, and enjoying books across genres. We are passionate about connecting readers with stories that inspire, educate, and entertain.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <img 
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f" 
            alt="Bookshelf" 
            className="rounded-2xl shadow-md"
          />

          <div>
            <h3 className="text-2xl font-semibold text-orange-100 mb-4">Our Mission</h3>
            <p className="text-gray-200 mb-4">
              To make reading accessible and enjoyable for everyone by providing a seamless online bookstore experience powered by modern technology.
            </p>

            <h3 className="text-2xl font-semibold text-orange-100 mb-4">Our Vision</h3>
            <p className="text-gray-200">
              To become the most trusted digital bookstore platform that encourages a lifelong love for reading.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
