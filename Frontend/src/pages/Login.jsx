import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

const Login = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false); // ✅ New state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const handleRememberChange = () => {
    setRememberMe(!rememberMe);
  };

  const submit = async () => {
    try {
      if (!Values.username || !Values.password) {
        alert("All fields must be filled");
        return;
      }

      const response = await axios.post("http://localhost:1000/api/v1/sign-in", Values);
      console.log("Login API Response:", response.data);

      if (!response.data || !response.data.id || !response.data.token) {
        console.error("Invalid response structure", response.data);
        alert("Login failed: Unexpected server response");
        return;
      }

      dispatch(authActions.login({
        user: { id: response.data.id, role: response.data.role },
        token: response.data.token
      }));

      const storage = rememberMe ? localStorage : sessionStorage;

      storage.setItem("id", response.data.id);
      storage.setItem("token", response.data.token);
      storage.setItem("role", response.data.role);

      navigate("/Profile");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response ? error.response.data.message : "Server error");
    }
  };

  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="flex mt-4 items-center justify-center text-zinc-200 text-xl">Login</p>
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

          {/* ✅ Remember Me checkbox */}
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberChange}
              className="mr-2"
            />
            <label className="text-zinc-300">Remember Me</label>
          </div>

          <div className="mt-4">
            <button
              className="bg-yellow-600 w-full text-zinc-900 font-semibold py-3 px-3 rounded hover:bg-orange-400"
              onClick={submit}
            >
              Login
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">Or</p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Don't have an account?&nbsp;
            <Link to="/signup" className="px-3 py-1 hover:text-orange-300 transition">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
