const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/TodoController')
const { authentication, authorizaton } = require('../middlewares/auth')

router.use(authentication)
router.post('/', TodoController.createTodo)
router.get('/', TodoController.fetchTodo)
router.get('/:id', TodoController.fetchOne)
router.put('/:id', TodoController.updateTodo)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router