import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import axios from 'axios';

const Sidebar = ({ data, logoutHandler, refreshProfile }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    username: data.username,
    email: data.email,
    password: '',
    avatar: data.avatar || '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('id');

      // Optional validation
      if (formData.password && formData.password.length < 7) {
        alert("Password should be at least 7 characters long.");
        return;
      }

      const response = await axios.put('http://localhost:1000/api/v1/update-user', formData, {
        headers: {
          id: userId, // ✅ Required by backend
          authorization: `Bearer ${token}`,
        },
      });

      console.log('Profile update response:', response.data);
      setShowDialog(false);
      setFormData((prev) => ({ ...prev, password: '' })); // Clear password field
      refreshProfile(); // ✅ Refresh after update
    } catch (err) {
      console.error('Failed to update profile:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className='bg-zinc-800 p-8 rounded flex flex-col items-center justify-between h-full'>
      <div className='flex flex-col items-center'>
        <img
          className='h-[10vh] w-[10vh] rounded-full object-cover'
          src={data.avatar || 'https://via.placeholder.com/150'}
          alt='User Avatar'
        />
        <p className='mt-3 text-xl text-orange-300 font-semibold text-center'>
          {data.username}
        </p>
        <p className='mt-1 text-sm text-zinc-200 font-serif text-center'>
          {data.email}
        </p>
        <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>
      </div>

      <div className='w-full flex-col items-center justify-center hidden lg:flex mt-4'>
        
        <Link
          to='/Profile/orderHistory'
          className='text-zinc-200 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'
        >
          Order History
        </Link>
        <button
          onClick={() => setShowDialog(true)}
          className='text-orange-400 font-semibold w-full py-2 text-center hover:bg-orange-600 rounded transition-all'
        >
          Edit Profile
        </button>
      </div>

      <button
        className='bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-zinc-200 font-semibold flex items-center justify-center rounded hover:bg-slate-600'
        onClick={logoutHandler}
      >
        Log Out <FaArrowRightFromBracket className='ml-2' />
      </button>

      {showDialog && (
        <div className="text-black fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-zinc-700 p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">Update Profile</h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 mb-2 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mb-2 rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mb-2 rounded"
            />
            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setShowDialog(false)}
                className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
