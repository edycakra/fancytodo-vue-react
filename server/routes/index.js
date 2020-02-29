const express = require('express')
const router = express.Router()
const UserRoutes = require('./UserRoutes')
const TodoRoutes = require('./TodoRoutes')
const ApiRoutes = require('./ApiRoutes')

router.use('/', UserRoutes)
router.use('/todos', TodoRoutes)
router.use('/api', ApiRoutes)

module.exports = router