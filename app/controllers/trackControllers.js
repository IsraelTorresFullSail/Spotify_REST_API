import asyncHandler from 'express-async-handler'
import axios from 'axios'
import request from 'request'

const client_id =
  process.env.SPOTIFY_CLIENT_ID || '94a838153d8c44d8ad8026b87567be99'
const client_secret =
  process.env.SPOTIFY_CLIENT_SECRET || '4305aab116f74e68a4595803847f9552'

/**
 * @description: Create a track
 * @route: /api/tracks
 * @access: Private
 */
export const createTrackMetadata = asyncHandler(async (req, res, next) => {
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
      console.log('login error: ', error)
      console.log('statusCode: ', response.statusCode)
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
          .then(({ data }) => {
            res.json(data)
          })
          .catch((error) => console.log(error))
      }
    })

    // 2- Get the {Sporify Image URI, Title, Artist Name List} from the fetch result
    // 3- In case the SpotifyAPI returns multiple tracks take the track with highest popularity
    // 4- Store the ISRC and the additional metadat into the DB
  } catch (error) {
    next(error)
  }
})
