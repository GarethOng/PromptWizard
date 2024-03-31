import mongoose from 'mongoose'

const ResponseSchema = new mongoose.Schema({
  response: {
    type: String,
    required: [true, 'Please provide response'],
    trim: true,
  },
  prompt_name: {
    type: String,
    required: [true, 'Please provide prompt name'],
    trim: true,
  },
  prompt_version: {
    type: String,
    required: [true, 'Please provide prompt version'],
    trim: true,
  },
  context_name: {
    type: String,
    required: [true, 'Please provide context name'],
    trim: true,
  },
  question: {
    type: String,
    required: [true, 'Please provide question'],
    trim: true,
  },
})

export default mongoose.model('Response', ResponseSchema)
