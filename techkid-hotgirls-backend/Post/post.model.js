const mongoose = require('mongoose');

// createdAt: Date
// content: string
// views: number
// imageUrl: string
// author: User

const PostSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },
  content: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    //tang toc do truy xuat theo id
    //
    ref: 'User',
    // dua vao ref va objectid thi truy xuat sang bang khac 
    required: true,
  },
  lastModifiedAt: Date,
});
const PostsModel = mongoose.model('Post', PostSchema);

module.exports = PostsModel;
