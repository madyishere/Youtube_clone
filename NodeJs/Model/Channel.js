import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true 
    },
    owner: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true
    },
    handle:{
      type: String,
      required: true
    },
    description: { 
      type: String,
    },
    subscribers: { 
      type: Number, 
      default: 0 
    },
    videos: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Video',
      required: true
    }]
  }, { timestamps: true });

  export default mongoose.model('Channel', ChannelSchema);
  