import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Sidebar from '../components/Profile/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import { authActions } from '../store/auth';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    dispatch(authActions.logout());
    navigate('/');
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get("http://localhost:1000/api/v1/get-user-info", {
        headers: {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile", error);
      logoutHandler(); // auto-logout on error
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className='px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4 text-white'>
      {!profile ? (
        <Loader />
      ) : (
        <>
          <div className='w-1/6'>
            <Sidebar data={profile} logoutHandler={logoutHandler} refreshProfile={() => fetchProfile()} />
          </div>
          <div className='w-5/6'>
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
