const express = require('express')
const router = express.Router()
const ApiController = require('../controllers/ApiController')

router.get('/', ApiController.getApi)

module.exports = router