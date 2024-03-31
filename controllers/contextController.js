import Context from '../models/Context.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'
import { generate_embedding } from '../external/openai.js'

const addContext = async (req, res) => {
  const { name, information } = req.body

  if (!name || !information) {
    throw new BadRequestError('please provide all values')
  }

  const contextAlreadyExists = await Context.findOne({ name })
  if (contextAlreadyExists) {
    throw new BadRequestError('Context already exists')
  }
  // generate embeddings
  const sentences = information.split('.')
  const contexts = []
  for (const sentence of sentences) {
    if (sentence.length < 2) {
      continue
    }
    // const embeddings = await generate_embedding(sentence)
    const context = await Context.create({
      name,
      information: sentence,
      // embeddings: Array.from(embeddings.data),
    })
    contexts.push(context)
  }
  res.status(StatusCodes.OK).json({ contexts })
}

const querySimilarContext = async (req, res) => {
  const { query, name } = req.body
  const queryEmbeddings = await generate_embedding(query)
  const similarContexts = await Context.aggregate([
    {
      $vectorSearch: {
        index: 'embedding',
        path: 'embedding',
        queryVector: queryEmbeddings.data[0].embedding,
        numCandidates: 7,
        limit: 5,
      },
    },
    {
      $match: {
        name: name, // Filter documents where the name field has the value "linda"
      },
    },
    {
      $project: {
        embedding: 0, // Exclude the embedding field
      },
    },
  ])
  res.status(StatusCodes.OK).json({ similarContexts })
}

const findBasedOnName = async (req, res) => {
  const { name } = req.body
  const results = await Context.find({ name })
  res.status(StatusCodes.OK).json({ results })
}
export { addContext, querySimilarContext, findBasedOnName }
