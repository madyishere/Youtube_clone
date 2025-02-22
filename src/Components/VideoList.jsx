import { useEffect, useState } from "react";
import VideoCard from "./VideoCard.jsx";
import axios from "axios";

function VideoList({selectedFilter, searchQuery}) {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchVideos = async() => {
      setIsLoading(true);
      try{
        const endpoint = `http://localhost:3000/videos?${selectedFilter !== "All" ? `category=${selectedFilter}&` : ""}${searchQuery ? `search=${searchQuery}` : ""}`;
        const response = await axios.get(endpoint);
        setVideos(response.data.videos);
      } catch(error) {
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchVideos();
  }, [selectedFilter, searchQuery])
  
  return (
    <div className="flex flex-1 flex-col overflow-y-auto h-[calc(100vh-130px)] sm:h-[calc(100vh-100px)] pb-16 sm:pb-0">
      {isLoading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      ) : (
        <p className="text-center w-full text-gray-500 mt-8">No videos found</p>
      )}
    </div>
  );
}

export default VideoList;