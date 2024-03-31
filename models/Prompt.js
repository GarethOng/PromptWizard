import mongoose from 'mongoose'

const PromptSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  prompt_description: {
    type: String,
    required: [true, 'Please provide prompt description'],
    minlength: 3,
    maxlength: 500,
    trim: true,
  },
  version: {
    type: String,
    required: [true, 'Please provide version'],
    minlength: 1,
    maxlength: 20,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Prompt', PromptSchema)
