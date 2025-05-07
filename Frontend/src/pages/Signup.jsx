import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  // ✅ Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submit = async () => {
    try {
      if (
        Values.username === "" ||
        Values.email === "" ||
        Values.password === "" ||
        Values.address === ""
      ) {
        setMessage("❌ All fields must be filled.");
      } else if (!isValidEmail(Values.email)) {
        setMessage("❌ Please enter a valid email address.");
      } else {
        const response = await axios.post("http://localhost:1000/api/v1/sign-up", Values);
        setMessage("✅ Registered Successfully! Redirecting to Login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      if (error.response) {
        setMessage(`❌ ${error.response.data.message}`);
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="flex mt-4 items-center justify-center text-zinc-200 text-xl">Sign-up</p>

        {message && (
          <div className="text-center mt-4 text-sm text-green-400 font-semibold">
            {message}
          </div>
        )}

        <div className="mt-4">
          <div>
            <label className="text-zinc-400">Username</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="username"
              name="username"
              value={Values.username}
              onChange={change}
              required
            />
          </div>
          <div className="mt-4">
            <label className="text-zinc-400">Email</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="e-mail"
              name="email"
              value={Values.email}
              onChange={change}
              required
            />
          </div>
          <div className="mt-4">
            <label className="text-zinc-400">Password</label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Password"
              name="password"
              value={Values.password}
              onChange={change}
              required
            />
          </div>
          <div className="mt-4">
            <label className="text-zinc-400">Address</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Address"
              name="address"
              value={Values.address}
              onChange={change}
              required
            />
          </div>
          <div className="mt-6">
            <button
              className="bg-yellow-600 w-full text-zinc-900 font-semibold py-3 px-3 rounded hover:bg-orange-400"
              onClick={submit}
            >
              Signup
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">Or</p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Already have an account? &nbsp;
            <Link to="/login" className="px-3 py-1 hover:text-orange-300 transition">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
