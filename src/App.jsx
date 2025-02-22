import './App.css'
import Header from './Components/Header.jsx'
import Sidebar from './Components/Sidebar.jsx'
import { Outlet } from 'react-router-dom'
import VideoList from './Components/VideoList.jsx'
import VideoFilters from './Components/videoFilter.jsx'
import { useState, useEffect } from 'react'

function App() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSideBarCollapsed, setIsSideBarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-collapse sidebar on small screens
      if (window.innerWidth < 768) {
        setIsSideBarCollapsed(true);
      }
    };
    // Check initially
    checkIfMobile();
    // Add listener for window resize
    window.addEventListener('resize', checkIfMobile);
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleToggleSidebar = () => {
    setIsSideBarCollapsed(!isSideBarCollapsed);
  };

  return (
    <>
      <Header 
        onSearch={setSearchQuery} 
        onToggleSideBar={handleToggleSidebar} 
        isSideBarCollapsed={isSideBarCollapsed}
      />
      <Sidebar isCollapsed={isSideBarCollapsed} />
      <main 
        className={`pt-14 transition-all duration-200 ${
          isMobile ? 'ml-0 pb-14' : isSideBarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <VideoFilters onFilterChange={setSelectedFilter} />
        <div className="p-2 sm:p-4">
          <VideoList selectedFilter={selectedFilter} searchQuery={searchQuery}/>
        </div>
      </main>
    </>
  )
}

export default App