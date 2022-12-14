const trackRoutes = require('./trackRoutes')

const entryPoint = '/api'

/**
 * Object for map routes to Mongoose models (mainly for history log purpose)
 */
module.exports = {
  trackModel: {
    path: `${entryPoint}/tracks`,
    router: trackRoutes,
    name: 'Tracks',
  },
}
