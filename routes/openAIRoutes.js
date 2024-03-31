import { Router } from 'express'
import {
  generateQuestion,
  sendQuestionToOpenAI,
} from '../controllers/openAIController.js'

const router = Router()
router.route('/generate').post(generateQuestion)
router.route('/send').post(sendQuestionToOpenAI)

export default router
