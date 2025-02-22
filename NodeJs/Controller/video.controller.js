//videocontroller.jsx
import Channel from "../Model/Channel.js";
import User from "../Model/User.js";
import Video from "../Model/Video.js";

    export const  uploadVideo = async (req, res) => {
        const { title, description, thumbnail, videoUrl} = req.body;
        if(!req.user)
        {
            return res.status(403).json({message: "You need to login to upload a video"});
        }
        const user = await User.findOne({email: req.user.email});
        const uploader = user._id;
        const channelId = user.channel;
        const channel = await Channel.findById(channelId);
        const channelName = channel.name;
        if(!channelId){
            return res.status(403).json({message: "You need to create a channel before uploading a video"});
        }
        if (!title || !description || !thumbnail || !videoUrl) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        try {
            const video = await Video.create({
            title,
            channelName,
            description,
            thumbnailUrl: thumbnail,
            videoUrl,
            uploader,
            channelId,
            });
            res.status(201).json({ video });
        } catch (error) {
            console.error("Error uploading video:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    export const getVideo = async (req, res) => {
        try {
            const { id } = req.params;
            const video = await Video.findById(id)
                .populate('uploader', 'username')
            if (!video) {
                return res.status(404).json({ message: "Video not found" });
            }
            
            res.json({ video });
        } catch (error) {
            console.error("Error fetching video:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    export const getVideos = async (req, res) => {
        try{
            const { category, search } = req.query;
            let query = {};
            if(category && category !== 'All'){
                query.category = category;
            }
            if(search){
                query.title = { $regex: search, $options: 'i' };
            }
            const videos = await Video.find(query).populate('uploader', 'username').sort({createdAt: -1});
            res.json({ videos });

            // const query = category && category !== 'All' ? {category} : {};
            // const videos = await Video.find(query).populate('uploader', 'username').sort({createdAt: -1});
            // res.json({ videos });
        }
        catch(error)
        {
            console.error("Error fetching videos:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    export const getVideosFromChannel = async (req, res) => {
        try {
            const { channelId } = req.query;
            const videos = await Video.find({ channelId }).populate('uploader', 'username').sort({createdAt: -1});
            res.json({ videos });
        } catch (error) {
            console.error("Error fetching videos:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    export const deleteVideo = async(req,res) => {
        try{
            const { id } = req.params;
            const video = await Video.findById(id)
                .populate('uploader', 'username')
            if (!video) {
                return res.status(404).json({ message: "Video not found" });
            }
            await Video.deleteOne({ _id: id });
            return res.status(200).json({ message: "Deleted Successfully!" })
        }
        catch(error) {
            console.error("Error fetching videos:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    export const editVideo = async(req,res) => {
        try{
            if(!req.user)
            {
                return res.status(403).json({message: "You need to login to upload a video"});
            }
            const { title, description, thumbnail, videoUrl, videoId} = req.body;
            if (!title || !description || !thumbnail || !videoUrl || videoId) {
                return res.status(400).json({ message: "Missing required fields" });
            }
            const video = await Video.findOne({_id: videoId});
            if(!video)
            {
                return res.status(400).json({message: "Video not Found"})
            }
            await Video.findOneAndUpdate({_id: videoId}, {title, description, thumbnailUrl: thumbnail, videoUrl});
            return res.status(200).json({message: "updated Successfully"});
        } catch (e) {
            console.error("Error fetching videos:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
