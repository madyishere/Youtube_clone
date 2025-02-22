//channel.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { fetchUserData } from "./LoginForm";
import {  User, Video, Settings, Upload, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ChannelVideoCard from "./ChannelVideoCard";

const Channel = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [activeTab, setActiveTab] = useState('videos');
  const [videos, setVideos] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState();
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [showMenu, setShowMenu] = useState(false)
  const [showMenuButton, setShowMenuButton] = useState(false);
  const { channelId } = useParams();
  const navigate = useNavigate();
  console.log(`channel Id = ${channelId}`);

  
  // Default images
  const DEFAULT_AVATAR = "https://placehold.co/96";
  const DEFAULT_BANNER = "https://placehold.co/1280x320";
  
  useEffect(() => {
    const getUser = async () => {
      const user = await fetchUserData(token);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    }
    if (token) {
      getUser();
    }
  }, [token]);

  useEffect(()=> {
    if (user?.channel == channelId || user?.channel == channelData?._id) {
      setShowUploadButton(true);
      setShowMenuButton(true);
    } else {
      setShowMenuButton(false);
      setShowUploadButton(false);
    }
  }, [user, channelData])

  
  useEffect(() => {
    const channel = channelId || user?.channel;
    const getChannel = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/channel/${channel}`, {
        });
        setChannelData(response.data.channel);
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    }
    if (channel) {
      console.log(`channel = ${channel}`);
      getChannel();
    }
  }, [user]);
  

  const handleDeleteVideo = (videoId) => {
    setVideos(videos.filter(v => v._id !== videoId));
  };

  const handleEditVideo = (video) => {
    setSelectedVideo(video);
    setShowEditModal(true);
  };
  
  // Fetch channel videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/video`, {
          params: {
            channelId: channelId || user?.channel
          }
        });
        setVideos(response.data.videos || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    if (user?.channel || channelId) {
      fetchVideos();
    }
  }, [user, channelId]);

  const VideoUploadModal = ({ isOpen, onClose, isEdit, video }) => {
    const [title, setTitle] = useState(isEdit ? video?.title : '' );
    const [description, setDescription] = useState(isEdit ? video?.description : '');
    const [videoUrl, setVideoUrl] = useState(isEdit ? video?.videoUrl : '');
    const [thumbnail, setThumbnail] = useState(isEdit ? video?.thumbnailUrl : '');

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        let response;
        if (isEdit) {
          response = await axios.put(`http://localhost:3000/video`, {
                title,
                description,
                videoUrl,
                thumbnail,
                videoId: video._id
              }, {
                headers: {
                  'Authorization': `JWT ${token}`
                }
              });
              navigate(0);
        } else {
          response = await axios.post('http://localhost:3000/videos/upload', {
            title,
            description,
            videoUrl,
            thumbnail,
            channelId: user.channelId
          }, {
            headers: {
              'Authorization': `JWT ${token}`
            }
          });
          setVideos(prev => [...prev, response.data.video]);
        }
        
        onClose();
      } catch (error) {
        console.error('Error uploading/editing video:', error);
      }
    };
    console.log({channelData})
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
        <div className="bg-white rounded-lg w-full max-w-md p-3 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{ isEdit ? "Edit" : "Upload"} Video</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 sm:mb-4">
              <label className="block text-sm font-medium mb-1">Video URL (YouTube)</label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
            </div>
            <div className="mb-3 sm:mb-4">
              <label className="block text-sm font-medium mb-1">Thumbnail URL</label>
              <input
                type="text"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="https://..."
                required
              />
            </div>
            <div className="mb-3 sm:mb-4">
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div className="mb-3 sm:mb-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded p-2"
                rows="3"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white rounded hover:bg-red-700`}
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Channel Header */}
      <div className="bg-white shadow">
        <div className="mx-auto px-2 sm:px-4 py-3 sm:py-6">
          {/* Channel Banner */}
          <div className="h-24 sm:h-32 md:h-48 bg-gray-300 rounded-lg mb-3 sm:mb-4">
            <img 
              src={channelData?.bannerUrl || DEFAULT_BANNER}
              alt="Channel Banner"
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => e.target.src = DEFAULT_BANNER}
            />
          </div>
          
          {/* Channel Info - more flexible layout for mobile */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
              <img 
                src={channelData?.avatarUrl || DEFAULT_AVATAR}
                alt="Channel Avatar"
                className="w-full h-full object-cover"
                onError={(e) => e.target.src = DEFAULT_AVATAR}
              />
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold">{ channelData?.name || "Channel Name"}</h1>
              <p className="text-gray-600 text-sm sm:text-base">@{ channelData?.handle || "username"}</p>
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-4 mt-1 sm:mt-2">
                <span className="text-gray-600 text-sm">{channelData?.subscribers || 0} subscribers</span>
                <span className="text-gray-600 hidden sm:inline">•</span>
                <span className="text-gray-600 text-sm">{videos.length} videos</span>
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs - scrollable on mobile */}
          <div className="flex gap-4 sm:gap-8 mt-4 sm:mt-6 border-b overflow-x-auto pb-1 sm:pb-0">
            {['videos', 'playlists', 'about'].map((tab) => (
              <button
                key={tab}
                className={`pb-2 sm:pb-4 px-1 sm:px-2 capitalize whitespace-nowrap text-sm sm:text-base ${
                  activeTab === tab 
                    ? 'border-b-2 border-gray-800 text-gray-800 font-medium' 
                    : 'text-gray-600'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-7xl">
        {activeTab === 'videos' && (
          <div>
            {videos.length === 0 ? (
              <div className="text-center py-6 sm:py-12">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow p-4 sm:p-8">
                  <Video className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-400" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">No videos yet</h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                    Upload your first video to get started
                  </p>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="bg-red-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base rounded-full hover:bg-red-700"
                  >
                    Upload Video
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-end mb-3 sm:mb-6">
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className={`bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-full hover:bg-red-700 flex items-center gap-1 sm:gap-2 ${ showUploadButton ? "" : "hidden" }`}
                  >
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden xs:inline">Upload Video</span>
                    <span className="inline xs:hidden">Upload</span>
                  </button>
                </div>
                {/* Responsive grid - 1 column on mobile, 2 on tablet, 3+ on desktop */}
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                {videos.map((video) => (
                  <ChannelVideoCard 
                  key={video._id}
                  video={video}
                  showMenuButton={showMenuButton}
                  onDeleteVideo={handleDeleteVideo}
                  onEditVideo={handleEditVideo}
                />
))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'playlists' && (
          <div className="text-center py-6 sm:py-12 text-gray-600 text-sm sm:text-base">
            No playlists created yet
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-3 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">About</h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
              {channelData?.description || "Channel description goes here. Share your story and let viewers know what your channel is all about."}
            </p>
            <div className="border-t pt-3 sm:pt-4">
              <p className="text-gray-600 text-sm sm:text-base">
                <strong>Joined:</strong> {new Date(channelData?.createdAt).toLocaleDateString() || "January 2024"}
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                <strong>Total views:</strong> {videos.reduce((total, video) => total + (video.views || 0), 0)}
              </p>
            </div>
          </div>
        )}
      </div>
      <VideoUploadModal 
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />
      <VideoUploadModal 
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        isEdit={true}
        video={selectedVideo}
      />
    </div>  
  );
};

export default Channel;