const router = require('express').Router()
const {
  createTrackMetadata,
  getTrackMetadataByISRC,
  getTracksMetadataByArtist,
} = require('../controllers/trackControllers')

router.post('/', createTrackMetadata)
router.get('/isrc', getTrackMetadataByISRC)
router.get('/artist', getTracksMetadataByArtist)

module.exports = router
