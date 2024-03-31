import Prompt from '../models/Prompt.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'

const addPrompt = async (req, res) => {
  const { name, prompt_description, version } = req.body

  if (!name || !prompt_description || !version) {
    throw new BadRequestError('please provide all values')
  }

  const promptAlreadyExists = await Prompt.findOne({ name, version })
  if (promptAlreadyExists) {
    throw new BadRequestError('Prompt already exists')
  }
  const prompt = await Prompt.create({ name, prompt_description, version })
  res.status(StatusCodes.OK).json({
    prompt: {
      name: prompt.name,
      prompt_description: prompt.prompt_description,
      version: prompt.version,
    },
  })
}

const getAllPrompts = async (req, res) => {
  const prompts = await Prompt.find({})
  res.status(StatusCodes.OK).json({ prompts })
}

const getPrompt = async (req, res) => {
  const { name, version } = req.body
  console.log(req.body)
  const prompt = await Prompt.findOne({ name: name, version: version })
  res.status(StatusCodes.OK).json({ prompt: prompt })
}

export { addPrompt, getAllPrompts, getPrompt }
