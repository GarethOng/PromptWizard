import Context from '../models/Context.js'
import Prompt from '../models/Prompt.js'
import { generate_embedding } from '../external/openai.js'
import OpenAI from 'openai'
import Response from '../models/Response.js'

const generateQuestion = async (req, res) => {
  const { context_name, prompt_name, prompt_version, question } = req.body
  const prompt = await Prompt.findOne({
    name: prompt_name,
    version: prompt_version,
  })

  const embeddedPrompt = (await generate_embedding(prompt.prompt_description))
    .data[0].embedding
  const embeddedQuestion = (await generate_embedding(question)).data[0]
    .embedding
  const promptContexts = await findSimilarContext(embeddedPrompt, context_name)
  const questionContexts = await findSimilarContext(
    embeddedQuestion,
    context_name
  )
  // combine contexts together from prompt and question
  // remove duplicates
  res.json({
    promptContexts: promptContexts,
    questionContexts: questionContexts,
  })
}

const findSimilarContext = async (embeddedQuery, name = null) => {
  if (name == null) {
    const similarContexts = await Context.aggregate([
      {
        $vectorSearch: {
          index: 'embedding',
          path: 'embedding',
          queryVector: embeddedQuery,
          numCandidates: 7,
          limit: 5,
        },
      },
      {
        $project: {
          embedding: 0,
          name: 0,
          _id: 0,
          __v: 0,
        },
      },
    ])
    return similarContexts
  } else {
    const similarContexts = await Context.aggregate([
      {
        $vectorSearch: {
          index: 'embedding',
          path: 'embedding',
          queryVector: embeddedQuery,
          numCandidates: 10,
          limit: 5,
        },
      },
      {
        $match: {
          name: name,
        },
      },
      {
        $project: {
          embedding: 0,
          name: 0,
          _id: 0,
          __v: 0,
        },
      },
    ])
    return similarContexts
  }
}

const sendQuestionToOpenAI = async (req, res) => {
  const { question, context_name, prompt_name, prompt_version } = req.body
  const prompt = await Prompt.findOne({
    name: prompt_name,
    version: prompt_version,
  })

  const embeddedPrompt = (await generate_embedding(prompt.prompt_description))
    .data[0].embedding
  const embeddedQuestion = (await generate_embedding(question)).data[0]
    .embedding
  const promptContexts = await findSimilarContext(embeddedPrompt, context_name)
  const questionContexts = await findSimilarContext(
    embeddedQuestion,
    context_name
  )

  let map = {}
  let contexts = []
  for (const context of promptContexts) {
    map[context.name] = context.embedding
    contexts.push(context.name)
  }

  for (const context of questionContexts) {
    if (map[context.name] == undefined) {
      map[context.name] = context.embedding
      contexts.push(context.name)
    }
  }

  let finalQuestion = ''
  for (const context of contexts) {
    finalQuestion += context + '. '
  }
  finalQuestion += prompt.prompt_description + '. '
  finalQuestion += question

  const results = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant.',
      },
      {
        role: 'user',
        content: finalQuestion,
      },
    ],
  })
  const response = await Response.create({
    response: results.choices[0].message.content,
    prompt_name: prompt_name,
    prompt_version: prompt_version,
    context_name: context_name,
    question: question,
  })

  return res.json({ results: results.choices[0].message.content })
}

export { generateQuestion, sendQuestionToOpenAI }
