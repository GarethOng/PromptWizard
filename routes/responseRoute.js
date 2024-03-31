import { Router } from 'express'
import { getResponses } from '../controllers/responseController.js'

const router = Router()
router.route('/find').post(getResponses)

export default router
