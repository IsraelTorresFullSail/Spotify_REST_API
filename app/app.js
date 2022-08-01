const express = require('express')
const path = require('path')
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv')

const { notFound, errorHandler } = require('./middlewere/errorMiddlewere')
const routes = require('./routes/index')

dotenv.config()

const app = express()

app.use(express.json())

app.use(cors())

app.get('/', (req, res) => {
  res.send(`API  is running in ${process.env.NODE_ENV} ...`)
})

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

/** ROUTES */
Object.keys(routes).forEach((routeKey) => {
  const route = routes[routeKey]
  app.use(route.path, route.router)
})

app.use(notFound)

app.use(errorHandler)

module.exports = app
