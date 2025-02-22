import React, { useEffect, useState } from 'react';
import {
  HomeIcon,
  PlayCircleIcon,
  ClockIcon,
  FilmIcon,
  FireIcon,
  ShoppingBagIcon,
  MusicalNoteIcon,
  NewspaperIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';
import { fetchUserData } from './LoginForm';

function Sidebar({ isCollapsed }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [user, setUser] = useState(null);
    
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

  useEffect(() => {
    // Check if on mobile initially
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  const checkIfMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  // If on mobile and sidebar would be visible, hide it
  if (isMobile && !isCollapsed) {
    return null;
  }

  const menuItems = [
    { name: 'Home', icon: HomeIcon, link: '/' },
    { name: 'Shorts', icon: PlayCircleIcon, link: '/shorts' },
    { name: 'Subscriptions', icon: FilmIcon, link: '/subscriptions' },
    { divider: true },
    { name: 'You', icon: UserIcon, link: isLoggedIn ? (user.channel ? '/channel' : '/profile') : '/login' },
    { name: 'History', icon: ClockIcon, link: '/history' },
    { divider: true },
    { name: 'Trending', icon: FireIcon, link: '/trending' },
    { name: 'Shopping', icon: ShoppingBagIcon, link: '/shopping' },
    { name: 'Music', icon: MusicalNoteIcon, link: '/music' },
    { name: 'News', icon: NewspaperIcon, link: '/news' },
  ];

  const sidebarStyles = isMobile
    ? 'fixed bottom-0 left-0 right-0 h-14 bg-white border-t z-10'
    : `fixed left-0 top-14 h-screen ${isCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 transition-all duration-200 z-10`

  return (
    <div className={sidebarStyles}>
      {isMobile ? (
        // Mobile bottom navigation
        <div className="flex justify-around h-full">
          {menuItems.slice(0, 4).map((item, index) => {
            if (item.divider) return null;
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.link || '#'}
                className="flex flex-col items-center justify-center text-sm text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            );
          })}
        </div>
      ) : (
        // Desktop sidebar
        <div className="py-2 h-full overflow-y-auto">
          {menuItems.map((item, index) => {
            if (item.divider) {
              return isCollapsed ? null : <hr key={index} className="my-2 border-gray-200" />;
            }

            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.link || '#'}
                className={`flex ${isCollapsed ? 'justify-center' : 'items-center px-6'} py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors`}
                title={isCollapsed ? item.name : ""}
              >
                <Icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-4'}`} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Sidebar;