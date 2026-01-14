import mongoose from 'mongoose';

const ChapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a chapter title'],
  },
  description: {
    type: String,
  },
  classLevel: {
    type: Number,
    required: true,
    enum: [11, 12],
  },
  subject: {
    type: String,
    default: 'Physics',
  },
  price: {
    type: Number,
    default: 99,
  },
  order: {
    type: Number,
    default: 0, 
  },
});

export default mongoose.models.Chapter || mongoose.model('Chapter', ChapterSchema);
