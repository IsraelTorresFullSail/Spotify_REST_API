import trackRoutes from './trackRoutes.js'

const entryPoint = '/api'

/**
 * Object for map routes to Mongoose models (mainly for history log purpose)
 */
export default {
  trackModel: {
    path: `${entryPoint}/tracks`,
    router: trackRoutes,
    name: 'Tracks',
  },
}
