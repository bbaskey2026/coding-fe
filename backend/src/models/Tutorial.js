import mongoose from 'mongoose';

const TutorialSchema = new mongoose.Schema({
  language: {
    type: String,
    required: [true, 'Language is required'],
    trim: true,
    index: true
  },
  title: {
    type: String,
    required: [true, 'Tutorial title is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    index: true
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty level is required'],
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Easy'
  },
  summary: {
    type: String,
    required: [true, 'Summary description is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content explanation is required'],
    trim: true
  },
  codeExample: {
    type: String,
    required: [true, 'Code example is required'],
    trim: true
  },
  explanation: {
    type: String,
    required: [true, 'Code logic explanation is required'],
    trim: true
  }
}, {
  timestamps: true
});

// Text indexing for search capability
TutorialSchema.index({ title: 'text', summary: 'text', content: 'text' });

export const Tutorial = mongoose.model('Tutorial', TutorialSchema);
export default Tutorial;
