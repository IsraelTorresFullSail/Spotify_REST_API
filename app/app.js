import express from 'express'
import path from 'path'
import cors from 'cors'
import colors from 'colors'
import fs from 'fs'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

import { notFound, errorHandler } from './middlewere/errorMiddlewere.js'
//import connectDB from './config/db.js'
//import routes from './routes/index.js'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

// --   CONFIG ENV VARS FILES
const envFile = path.join(dirname, `.env.${process.env.NODE_ENV}`)
const exists = fs.existsSync(envFile)

if (process.env.NODE_ENV && exists) {
  dotenv.config({
    path: envFile,
  })
} else dotenv.config()

//connectDB()

const app = express()

app.use(express.json())

app.use(cors())

app.get('/', (req, res) => {
  res.send(`API  is running in ${process.env.NODE_ENV} ...`)
})

/** ROUTES */
// Object.keys(routes).forEach((routeKey) => {
//     const route = routes[routeKey]
//     app.use(route.path, route.router)
//   })

app.use(notFound)

app.use(errorHandler)

export default app
