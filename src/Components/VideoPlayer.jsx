// videoPlayer.jsx
import { Link, useParams } from "react-router-dom";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ShareIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import {
  HandThumbUpIcon as HandThumbUpSolid,
  HandThumbDownIcon as HandThumbDownSolid,
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

function VideoPlayer() {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscribe, setSubscribe] = useState(false);
  const [suggestedVideos, setSuggestedVideos] = useState([]);

  const isSubscribed = () => {
    setSubscribe(!subscribe);
  };

  // Helper function to convert a YouTube URL to an embed URL
  const getEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    } catch (error) {
      console.error("Invalid URL:", error);
      return url;
    }
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3000/videos/${id}`);
        const suggestedVideoResponse = await fetch("http://localhost:3000/videos");
        const videos = await suggestedVideoResponse.json();
        setSuggestedVideos(videos);
        if (!response.ok) {
          throw new Error("Video not found");
        }
        const data = await response.json();
        setVideo(data.video);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views;
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error || !video) {
    return <div className="text-center mt-10 text-xl">Video not found</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 md:gap-6 max-w-[1800px] mx-auto px-2 md:px-4">
      {/* Main Video Section */}
      <div className="w-full lg:w-2/3 xl:w-3/4">
        {/* Video Player */}
        <div className="relative pt-[56.25%] bg-black rounded-lg md:rounded-xl overflow-hidden mb-3 md:mb-4">
          <iframe
            src={getEmbedUrl(video.videoUrl)}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            title={video.title}
          ></iframe>
        </div>

        {/* Video Info */}
        <div className="mb-3 md:mb-4">
          <h1 className="text-lg md:text-xl font-bold mb-2">{video.title}</h1>
          
          {/* Channel Info + Action Buttons - Responsive Layout */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-3 md:mb-4">
            {/* Channel Info */}
            <div className="flex items-center gap-3">
              <img
                src={video.channelAvatarUrl}
                alt={video.channel}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full"
              />
              <div>
                <Link to={`/channel/${video.channelId}`} className="text-xs sm:text-sm font-medium text-gray-800 hover:text-gray-900">
                  <h3 className="font-medium text-sm md:text-base">{video.channel}</h3>
                </Link>
                <p className="text-xs md:text-sm text-gray-600">
                  {formatViews(video.views)} subscribers
                </p>
              </div>
              <button
                onClick={isSubscribed}
                className="ml-2 md:ml-4 bg-black text-white px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-full font-medium hover:bg-gray-800"
              >
                {subscribe ? "Subscribed" : "Subscribe"}
              </button>
            </div>

            {/* Action Buttons - Wrap on mobile, align right on larger screens */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mt-2 sm:mt-0">
              <button
                onClick={handleLike}
                className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base"
              >
                {isLiked ? (
                  <HandThumbUpSolid className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <HandThumbUpIcon className="w-4 h-4 md:w-5 md:h-5" />
                )}
                <span className="xs:inline">{formatViews(video.likes)}</span>
              </button>

              <button
                onClick={handleDislike}
                className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base"
              >
                {isDisliked ? (
                  <HandThumbDownSolid className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <HandThumbDownIcon className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </button>

              <button className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base">
                <ShareIcon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden xs:inline">Share</span>
              </button>

              <button className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base">
                <BookmarkIcon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden xs:inline">Save</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-100 rounded-lg md:rounded-xl p-2 md:p-3">
            <div className="flex items-center gap-2 text-xs md:text-sm mb-1 md:mb-2">
              <span>{formatViews(video.views)} views</span>
              <span>•</span>
              <span>{video.uploadDate}</span>
            </div>
            <p className={`text-xs md:text-sm ${!showMore && "line-clamp-2 md:line-clamp-3"}`}>
              {video.description}
            </p>
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-xs md:text-sm font-medium mt-1 md:mt-2"
            >
              {showMore ? "Show less" : "Show more"}
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mb-6 md:mb-8">
          <h3 className="font-medium text-base md:text-xl mb-3 md:mb-4">Comments</h3>
          <div className="space-y-3 md:space-y-4">
            {video.comments.map((comment) => (
              <div key={comment.commentId} className="flex gap-2 md:gap-3">
                <img
                  src="/api/placeholder/32/32"
                  alt="user avatar"
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0"
                />
                <div>
                  <p className="font-medium text-xs md:text-sm">@{comment.userId}</p>
                  <p className="text-xs md:text-sm">{comment.text}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button className="flex items-center gap-1 text-xs md:text-sm">
                      <HandThumbUpIcon className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                    <button className="flex items-center gap-1 text-xs md:text-sm">
                      <HandThumbDownIcon className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                    <button className="text-xs md:text-sm font-medium">Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested Videos Section - Full width on mobile, side column on desktop */}
      <div className="w-full lg:w-1/3 xl:w-1/4">
        <h3 className="font-medium text-base md:text-lg mb-2 md:mb-4">Suggested Videos</h3>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-1 gap-3 md:gap-4">
          {suggestedVideos.videos &&
            suggestedVideos.videos
              .filter((v) => v.videoId !== id)
              .slice(0, 10)
              .map((video) => (
                <Link key={video._id} to={`/video/${video._id}`}>
                  <div className="flex flex-col lg:flex-row gap-2 cursor-pointer">
                    <div className="relative w-full h-32 xs:h-24 lg:w-40 lg:h-22 flex-shrink-0">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 mt-1 lg:mt-0">
                      <h4 className="text-xs sm:text-sm font-medium line-clamp-2">
                        {video.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">{video.channel}</p>
                      <p className="text-xs text-gray-600">
                        {formatViews(video.views)} views • {video.uploadDate}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;