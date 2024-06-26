import express from 'express'
const app = express()
import cors from 'cors'
app.use(cors())
import dontev from 'dotenv'
dontev.config()
import 'express-async-errors'
import morgan from 'morgan'

// db and authenticateUser
import connectDB from './db/connect.js'

// routes
import authRouter from './routes/authRoutes.js'
import promptRouter from './routes/promptRoutes.js'
import contexRouter from './routes/contextRoutes.js'
import openAIRouter from './routes/openAIRoutes.js'
import responseRouter from './routes/responseRoute.js'

// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
  res.json('Welcome!')
})

app.get('/api/v1', (req, res) => {
  res.json('Proxy connected!')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/prompt', promptRouter)
app.use('/api/v1/context', contexRouter)
app.use('/api/v1/openai', openAIRouter)
app.use('/api/v1/response', responseRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5001

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
