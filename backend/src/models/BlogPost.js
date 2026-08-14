import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  summary: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    default: '',
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
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published',
  },
  tags: {
    type: [String],
    default: [],
  },
  claps: {
    type: Number,
    default: 0,
  },
  clappedBy: {
    type: [Number], // Store user IDs who have clapped
    default: [],
  },
  readingTime: {
    type: Number,
    default: 1,
  },
}, {
  timestamps: true,
});

// Text index for search functionality on title, summary, and content
BlogPostSchema.index({ title: 'text', summary: 'text', content: 'text' });

// Auto-calculate reading time before save
BlogPostSchema.pre('save', function (next) {
  if (this.isModified('content')) {
    const wordsPerMinute = 200;
    const wordsCount = this.content ? this.content.trim().split(/\s+/).length : 0;
    this.readingTime = Math.max(1, Math.ceil(wordsCount / wordsPerMinute));
  }
  next();
});

export const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
export default BlogPost;
