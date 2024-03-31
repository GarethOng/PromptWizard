import Response from '../models/Response.js'

const getResponses = async (req, res) => {
  const { prompt_name, prompt_version } = req.body
  const responses = await Response.find({
    prompt_name: prompt_name,
    prompt_version: prompt_version,
  })

  res.status(200).json({ responses: responses })
}

export { getResponses }
