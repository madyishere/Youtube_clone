//videoCard.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

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

  const handleClick = () => {
    navigate(`/video/${video._id}`);
  };

  return (
    <div 
      className="w-full sm:max-w-[360px] cursor-pointer group flex flex-col sm:flex-col"
      onClick={handleClick}
    >
      {/* Thumbnail Container with Aspect Ratio */}
      <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden mb-3">
        <img 
          src={video.thumbnail || video.thumbnailUrl} 
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        {video.duration && (
          <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
            {video.duration}
          </div>
        )}
      </div>

      {/* Video Info Container */}
      <div className="flex gap-3">
        {/* Channel Avatar */}
        <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden mt-1">
          <img 
            src={video.channelAvatarUrl || "/api/placeholder/36/36"} 
            alt={`${video.channelName || video.channel} avatar`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm mb-1 line-clamp-2 leading-5 group-hover:text-blue-600">
            {video.title}
          </h3>

          {/* Channel Name */}
          <Link to={`/channel/${video.channelId}`} className="text-xs sm:text-sm font-medium text-gray-800 hover:text-gray-900">
          <p className="text-xs sm:text-sm text-gray-600 hover:text-gray-900">
            {video.channelName || video.channel}
          </p>
          </Link>

          {/* Views and Date */}
          <p className="text-xs sm:text-sm text-gray-600">
            {formatViews(video.views)} views • {formatDate(video.uploadDate)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;