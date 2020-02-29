//environment
if (process.env.NODE_ENV === 'development') require('dotenv').config()

//declare
const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const errorHandlers = require('./middlewares/errorHandlers')

//middlewares
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//routing
app.use(routes)

//errorHandler
app.use(errorHandlers)

//listening on bin/http.js

module.exports = app