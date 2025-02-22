import { MagnifyingGlassIcon, UserCircleIcon, Bars3Icon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUserData } from "./LoginForm";

function Header({onSearch, onToggleSideBar, isSideBarCollapsed}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [showSearchMobile, setShowSearchMobile] = useState(false);

  const handleSearch = () => {
    onSearch(search);
    if (window.innerWidth < 640) {
      setShowSearchMobile(false);
    }
  }
  
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
    }
    if (token) fetchData();
  }, [token]);  

  return (
    <header className="fixed left-0 top-0 right-0 w-full h-14 flex items-center justify-between p-2 px-3 text-white border-b-2 border-gray-300 z-20 bg-white">
      <div className="flex items-center">
        <button className="p-2" onClick={onToggleSideBar}>
          <Bars3Icon className="w-5 h-5 text-gray-700" />
        </button>
        <Link to="/" className="ml-2 hidden sm:block">
          <img src="/src/assets/pngwing.com.png" alt="Logo" className="w-24 sm:w-28" />
        </Link>
      </div>

      {/* Mobile search toggle */}
      <div className="sm:hidden">
        {showSearchMobile ? (
          <div className="absolute left-0 top-0 right-0 p-2 bg-white flex items-center z-30">
            <button className="p-2 mr-2" onClick={() => setShowSearchMobile(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>
            <input 
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              type="text" 
              placeholder="Search" 
              className="bg-gray-100 p-2 rounded-lg text-black focus:outline-none flex-1" 
              autoFocus
            />
            <button 
              className="bg-gray-100 p-2 rounded-lg text-white ml-2"
              onClick={handleSearch}
            >
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setShowSearchMobile(true)}
            className="p-2"
          >
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-700" />
          </button>
        )}
      </div>

      {/* Desktop/Tablet search */}
      <div className="hidden sm:flex items-center mx-auto w-full max-w-lg px-4">
        <input 
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          type="text" 
          placeholder="Search" 
          className="bg-gray-100 p-1 px-2 rounded-l-lg text-black focus:outline-none w-full" 
        />
        <button 
          onClick={handleSearch}
          className="bg-gray-100 p-1 rounded-r-lg text-white"
        >
          <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      <div>
      <Link 
        to={isLoggedIn ? (user?.channel ? "/channel" : "/profile") : "/login"} 
        className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 rounded-full bg-blue-100 text-blue-600 font-medium hover:bg-blue-200 transition"
      >
        <UserCircleIcon className="w-6 h-6" />
        <span className="hidden sm:inline">
          {isLoggedIn ? user?.username : "Sign in"}
        </span>
      </Link>
    </div>

    </header>
  );
}

export default Header;