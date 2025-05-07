import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../../assets/logo.png';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useSelector } from 'react-redux';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about-us" },
    { title: "Contact Us", link: "/contact" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/Profile" }
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);

  if (!isLoggedIn) {
    links.splice(3, 4); // remove Cart and Profile
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-black text-white px-6 py-4 flex items-center justify-between relative">
      {/* Logo & Title */}
      <div className="flex items-center">
        <img src={LogoImage} alt="Logo" className="h-10 me-4" />
        <h1 className="text-xl sm:text-2xl font-semibold">Online Bookstore</h1>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-6">
        {links.map((item, i) => (
          <div key={i} className="flex items-center">
            {item.title === "Profile" ? (
              <Link
                to={item.link}
                className="border border-orange-600 px-3 py-1 rounded hover:bg-orange-500 transition"
              >
                {item.title}
              </Link>
            ) : (
              <Link
                to={item.link}
                className="hover:text-orange-500 transition"
              >
                {item.title}
              </Link>
            )}
          </div>
        ))}
        {!isLoggedIn && (
          <>
            <Link to="/login" className="px-3 py-1 border border-orange-500 hover:bg-orange-500 hover:text-zinc-900 rounded transition">
              Login
            </Link>
            <Link to="/signup" className="px-3 py-1 border border-white hover:bg-white hover:text-zinc-900 rounded transition">
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="lg:hidden z-20" onClick={toggleMenu}>
        {menuOpen ? (
          <IoMdClose size={28} className="cursor-pointer" />
        ) : (
          <GiHamburgerMenu size={24} className="cursor-pointer hover:text-orange-500" />
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-zinc-900 flex flex-col items-start gap-4 p-6 lg:hidden z-10 shadow-md">
          {links.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-orange-400 transition"
            >
              {item.title}
            </Link>
          ))}
          {!isLoggedIn && (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-white hover:text-orange-400">
                Login
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="text-white hover:text-orange-400">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
