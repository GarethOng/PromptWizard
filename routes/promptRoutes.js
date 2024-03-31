import express from 'express'
const router = express.Router()

import {
  addPrompt,
  getAllPrompts,
  getPrompt,
} from '../controllers/promptController.js'

router.route('/add').post(addPrompt)
router.route('/').get(getAllPrompts)
router.route('/get').post(getPrompt)

export default router
