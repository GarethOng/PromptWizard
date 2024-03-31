import mongoose from 'mongoose'

const ContextSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  information: {
    type: String,
    required: [true, 'Please provide information'],
    trim: true,
  },
  // embeddings generated from openai embedding ada 002
  /*
  embeddings: {
    type: [Number],
    required: true,
  },
  */
})

export default mongoose.model('Context', ContextSchema)
