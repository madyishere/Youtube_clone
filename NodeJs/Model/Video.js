import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String,
    default: "" 
  },
  thumbnailUrl: { 
    type: String,
    default: "/api/placeholder/320/180"
  },
  videoUrl: { 
    type: String, 
    required: true 
  },
  duration: {
    type: String,
    default: "0:00"
  },
  category: {
    type: String,
    enum: ['All', 'Music', 'Gaming', 'Education', 'Sports', 'Comedy', 'Entertainment', 'News', 'Tech', 'Cooking']
  },
  uploader: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  channelName: {
    type: String,
    required: true
  },
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel',
  },
  views: { 
    type: Number, 
    default: 0 
  },
  likes: { 
    type: Number, 
    default: 0 
  },
  dislikes: { 
    type: Number, 
    default: 0 
  },
  comments: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [{
    type: String
  }]
}, { 
  timestamps: true 
});

// for fastening the database system 
VideoSchema.index({ uploader: 1, createdAt: -1 });
VideoSchema.index({ title: 'text', description: 'text' });

export default mongoose.model('Video', VideoSchema);