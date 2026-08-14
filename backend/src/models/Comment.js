import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost',
    required: true,
  },
  authorId: {
    type: Number,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
    trim: true,
  },
  authorAvatar: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});

// Index postId for fast fetching of a post's comments
CommentSchema.index({ postId: 1, createdAt: -1 });

export const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;
