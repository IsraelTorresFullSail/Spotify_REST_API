import asyncHandler from 'express-async-handler'

/**
 * @description: Create a track
 * @route: /api/tracks
 * @access: Private
 */
export const createTrackMetadata = asyncHandler(async (req, res, next) => {
  try {
    // 1- Fetch API to create a track using a single endpoint which takes a single value "ISRC"
    // 2- Get the {Sporify Image URI, Title, Artist Name List} from the fetch result
    // 3- In case the SpotifyAPI returns multiple tracks take the track with highest popularity
    // 4- Store the ISRC and the additional metadat into the DB
  } catch (error) {
    next(error)
  }
})
