//Profile.jsx

import React, { useEffect, useState } from 'react';
import { fetchUserData } from "./LoginForm";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [handle, setHandle] = useState('');
  const [name, setName] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      const user = await fetchUserData(token);
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    };
    if (token) fetchData();
  }, [token]);

    const handleCreateChannel = async () => {
        if (!user) {
            console.error("User not found");
            return;
        }
        const response = await axios.post("http://localhost:3000/channel", {
            name: name,
            handle: handle,
        },
        {
            headers:{
                Authorization: `JWT ${token}`,
            },
        });
        console.log(response);
        window.location.href = "/";
    };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow p-6">
      <div className="text-center">
        <h1 className="text-xl font-semibold mb-6">How you'll appear</h1>
        
        {/* Profile Picture Circle */}
        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-blue-200 flex items-center justify-center cursor-pointer hover:bg-blue-300">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
    

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="text-left">
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="text-left">
            <label className="block text-sm text-gray-600 mb-1">Handle</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="@handle"
              onChange={(e) => setHandle(e.target.value)}
            />
          </div>
        </div>

        {/* Terms of Service */}
        <p className="text-xs text-gray-500 mt-6 mb-6">
          By clicking Create Channel you agree to YouTube's Terms of Service. Changes made to your name and
          profile picture are visible only on YouTube and not other Google services.{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">Learn more</span>
        </p>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Link to={"/"}>Cancel</Link>
          </button>
          <button onClick={handleCreateChannel}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create channel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;