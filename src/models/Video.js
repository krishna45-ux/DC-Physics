import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a video title'],
  },
  url: {
    type: String,
    required: [true, 'Please provide a video URL'],
  },
  chapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Video || mongoose.model('Video', VideoSchema);
