import express from 'express'
const router = express.Router()

import {
  addContext,
  querySimilarContext,
  findBasedOnName,
} from '../controllers/contextController.js'

router.route('/add').post(addContext)
router.route('/query').post(querySimilarContext)
router.route('/find').post(findBasedOnName)

export default router
