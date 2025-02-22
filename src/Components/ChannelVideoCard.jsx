import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import axios from 'axios';

const ChannelVideoCard = ({ 
  video, 
  showMenuButton, 
  onDeleteVideo, 
  onEditVideo 
}) => {

  const [showMenu, setShowMenu] = useState(false);

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toLocaleString();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:3000/video/${video._id}`);
      onDeleteVideo(video._id);
      setShowMenu(false);
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    onEditVideo(video);
    setShowMenu(false);
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow relative">
      <Link to={`/video/${video._id}`}>
        <div className="relative pb-[56.25%]">
          <img 
            src={video.thumbnailUrl}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
          />
        </div>
      </Link>
      <div className="p-2 sm:p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-1 line-clamp-2 flex-1">
            {video.title}
          </h3>
          {showMenuButton && (
            <div className="relative">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowMenu(!showMenu);
                }}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg z-50 border">
                  <button
                    onClick={handleEdit}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-600 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center text-gray-600 text-xs sm:text-sm">
          <span>{formatViews(video.views || 0)} views</span>
          <span className="mx-1 sm:mx-2">•</span>
          <span>{formatDate(video.uploadDate)}</span>
        </div>
      </div>
    </div>
  );
};

export default ChannelVideoCard;