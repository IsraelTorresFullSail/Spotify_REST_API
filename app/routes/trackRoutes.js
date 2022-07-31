import express from 'express'
import { createTrackMetadata } from '../controllers/trackControllers.js'

const router = express.Router()

router.post('/', createTrackMetadata)

export default router
