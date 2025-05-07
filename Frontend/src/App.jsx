import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AllBooks from './pages/AllBooks';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import DiscoverBooks from "./pages/DiscoverBooks";
import Cart from './pages/cart';
import Favourites from './components/Profile/Favourites';
import Profile from './pages/Profile';
import OrderHistory from './components/Profile/OrderHistory';
import Settings from './components/Profile/settings'; // Make sure this file exists
import { useDispatch, useSelector } from "react-redux";
import { authActions } from './store/auth';
import BookDetails from './components/Bookcard/BookDetails';

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-books" element={<AllBooks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/discover-books" element={<DiscoverBooks />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/book/:id" element={<BookDetails />} />
          
          {/* Profile and nested routes */}
          <Route path="/Profile" element={<Profile />}>
            <Route index element={<Favourites />} />
            <Route path="orderHistory" element={<OrderHistory />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
