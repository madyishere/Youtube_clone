import { useState } from 'react';

const VideoFilters = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = [
    'All',
    'Music',
    'Gaming',
    'Education',
    'Sports',
    'Comedy',
    'Entertainment',
    'News',
    'Tech',
    'Cooking'
  ];

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="w-full overflow-x-auto py-2 sm:py-3 px-2 sm:px-4 border-b border-gray-200 sticky top-14 bg-white z-10">
      <div className="flex gap-2 sm:gap-3 min-w-max">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterClick(filter)}
            className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap
              ${activeFilter === filter 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VideoFilters;