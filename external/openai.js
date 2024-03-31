import OpenAI from 'openai'

const generate_embedding = async (text) => {
  const embedding = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text,
    encoding_format: 'float',
  })
  return embedding
}

export { generate_embedding }
