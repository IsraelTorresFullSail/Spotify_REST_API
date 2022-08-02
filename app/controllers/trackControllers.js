const { Artists, Tracks, Sequelize } = require('../models')
const { throwError, throwIf } = require('../utils/errorHandling')
const asyncHandler = require('express-async-handler')
const axios = require('axios')
const request = require('request')

const client_id =
  process.env.SPOTIFY_CLIENT_ID || '94a838153d8c44d8ad8026b87567be99'
const client_secret =
  process.env.SPOTIFY_CLIENT_SECRET || '4305aab116f74e68a4595803847f9552'

/**
 * @description: Create a track
 * @route: /api/tracks
 * @access: Private
 */
exports.createTrackMetadata = asyncHandler(async (req, res, next) => {
  try {
    const { isrc } = req.body
    const api = `https://api.spotify.com/v1/search?q=isrc:${isrc}&type=track`

    //Client Credentials Flow
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        Authorization:
          'Basic ' +
          new Buffer(client_id + ':' + client_secret).toString('base64'),
      },
      form: {
        grant_type: 'client_credentials',
      },
      json: true,
    }
    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        var token = body.access_token
        // Fetch API to create a track using a single endpoint which takes a single value "ISRC"
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }

        axios
          .get(api, config)
          .then(async ({ data }) => {
            // In case the SpotifyAPI returns multiple tracks take the track with highest popularity
            const highPopularity = data.tracks.items.reduce((prev, current) => {
              if (+current.popularity > +prev.popularity) {
                return current
              } else {
                return prev
              }
            })

            // Store the ISRC and the additional metadat into the DB
            const newArtist = await Artists.create({
              artistName: highPopularity.album.artists[0].name,
            })
              .catch(
                new Sequelize.ValidationError(),
                throwError(406, 'Validation Error')
              )
              .catch(
                new Sequelize.BaseError(),
                throwError(
                  500,
                  'A database error has occurred please try again.'
                )
              )

            await Tracks.create({
              isrc: isrc,
              spotifyImageUri: highPopularity.uri,
              title: highPopularity.name,
              artistId: newArtist.id,
            })
              .catch(
                new Sequelize.ValidationError(),
                throwError(406, 'Validation Error')
              )
              .catch(
                new Sequelize.BaseError(),
                throwError(
                  500,
                  'A database error has occurred please try again.'
                )
              )

            res
              .status(201)
              .json({ message: 'Track Metadata created successfully' })
          })
          .catch((error) => console.log(error))
      }
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @description: Get a track by ISRC
 * @route: /api/tracks/isrc
 * @access: Public
 */
exports.getTrackMetadataByISRC = asyncHandler(async (req, res, next) => {
  try {
    const { isrc } = req.body

    const track = await Tracks.findAll({
      where: { isrc },
    }).catch(throwError(500, 'A database error has occurred please try again.'))

    res.status(201).json({
      track,
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @description: Get a track by Artist
 * @route: /api/tracks/artist
 * @access: Public
 */
exports.getTracksMetadataByArtist = asyncHandler(async (req, res, next) => {
  try {
    const { artistName } = req.body

    const artists = await Artists.findAll({
      where: { artistName },
    }).catch(throwError(500, 'A database error has occurred please try again.'))

    let tracks = []
    await artists.reduce(async (prev, artist) => {
      await prev

      let track = await Tracks.findAll({
        where: { artistId: artist.id },
      }).catch(
        throwError(500, 'A database error has occurred please try again.')
      )

      tracks.push(track)

      return Promise.resolve()
    }, Promise.resolve())

    res.status(201).json({
      tracks,
    })
  } catch (error) {
    next(error)
  }
})
