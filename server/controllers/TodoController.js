const {Todo} = require('../models')

class TodoController {
    static createTodo (req, res, next) {
        console.log('>>>>>>')
        let payload = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status || false,
            due_date: req.body.due_date,
            UserId: req.decoded.id
        }
        Todo.create(payload)
            .then(todo => {
                res.status(201).json({todo})
            })
            .catch(err => {
                next(err)
            })
    }

    static fetchTodo (req, res, next) {
        let UserId = +req.decoded.id
        Todo
            .findAll({where: {UserId}})
            .then(todos => {
                res.status(200).json({todos})
            })
            .catch(err => {
                next(err)
            })

    }

    static fetchOne (req, res, next) {
        console.log('=====')
        let id = +req.params.id
        Todo   
            .findByPk(id)
            .then(todo => {
                if (todo) {
                    res.status(200).json({todo})
                } else {
                    res.status(200).json({todo})
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static updateTodo (req, res, next) {
        let id = +req.params.id
        let payload = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.decoded.id
        }
        Todo    
            .update(payload, {where: {id}, returning: true})
            .then(todo => {
                if (todo) {
                    res.status(200).json({todo})
                } else {
                    next({
                        status: 404,
                        name:'NOTFOUND',
                        message: 'todo does not exists'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteTodo (req, res, next) {
        let id = +req.params.id
        let UserId = +req.decoded.id

        Todo    
            .destroy({where: {id, UserId}})
            .then(todo => {
                if (todo) {
                    res.status(200).json({message: 'todo is successfully deleted'})
                } else {
                    next({
                        status: 400,
                        name: 'NOTFOUND',
                        message: 'todo does not exists'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = TodoController