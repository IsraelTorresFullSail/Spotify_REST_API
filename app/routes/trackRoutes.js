const router = require('express').Router()
const { createTrackMetadata } = require('../controllers/trackControllers')

router.post('/', createTrackMetadata)

module.exports = router
