    import Channel from "../Model/Channel.js";
    import User from "../Model/User.js";

    export const createChannel = async (req,res) => {
        const user = await User.findOne({email: req.user.email});
        if(user.channel)
        {
            return res.status(400).json({ message: "Channel already exists!" });
        }
        const {name, handle} = req.body;
        if(!name || !handle)
        {
            return res.status(400).json({ message: "please provide all details!" });
        }
        // const existingChannel = await Channel.findOne({name});
        // if(existingChannel)
        // {
        //     return res.status(400).json({ message: "Channel already exists!" });
        // }
        const newChannel = new Channel({ name, handle, owner: user._id });
        await newChannel.save();
        await User.findOneAndUpdate({email: req.user.email}, {channel: newChannel._id});
        return res.status(201).json({ message: "Channel created successfully!"});
    }

    // export const getChannel = async (req,res) => {
    //     const {channelId} = req.params;
    //     const channel = await Channel.findById(channelId);
    //     if(!channel)
    //     {
    //         return res.status(404).json({ message: "Channel not found!" });
    //     }
    //     return res.status(200).json({ channel });
    // }
    export const getChannel = async (req,res) => {
        try {
            const {channelId} = req.params;
            console.log({channelId});
            const channel = await Channel.findById(channelId)
                .populate('owner', 'username email')
                .populate('videos');
            if(!channel) {
                return res.status(404).json({ message: "Channel not found!" });
            }
            return res.status(200).json({ channel });
        } catch (e) {
            console.error("Error fetching channel:", e);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    // export const updateChannel = async (req,res) => {
    //     const {channelId} = req.params;
    //     const {name, handle, description,} = req.body;
    //     const channel = await Channel.findById(channelId);
    //     if(!channel)
    //     {
    //         return res.status(404).json({ message: "Channel not found! / create channel first!!" });
    //     }
    //     channel.name = name;
    //     channel.handle = handle;

    //     await channel.save();
    //     return res.status(200).json({ message: "Channel updated successfully!" });
    // }