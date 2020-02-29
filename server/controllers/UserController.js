const {User} = require('../models')
const {checkPassword} = require('../helpers/hashPassword')
const jwt = require('jsonwebtoken')

class UserController {
    static register (req, res, next) {
        let {email, password} = req.body
        let newUser = {email, password}
        console.log(newUser)
        User
            .findOne({ where: {email}})
            .then(user => {
                if (user) {
                    next({
                        status: 400,
                        name: 'REGISTERFAILED',
                        message: 'user already exists'
                    })
                } else {
                    User.create(newUser)
                        .then(newUser => {
                            let payload = {
                                id: newUser.id,
                                email: newUser.email
                            }
                            let access_token = jwt.sign(payload, process.env.SECRET)
                            res.status(201).json({
                                message: 'REGISTERSUCCESS',
                                email: newUser.email,
                                access_token
                            })
                        })
                        .catch(err => {
                            next(err)
                        })
                }
            })
            .catch(err => {
                next(err)
            })

    }

    static login (req, res, next) {
        let {email, password} = req.body
        User
            .findOne({where: {email}})
            .then(user => {
                if (user) {
                    if (checkPassword(password, user.password)) {
                        let payload = {
                            id: user.id,
                            email: user.email
                        }
                        let access_token = jwt.sign(payload, process.env.SECRET)
                        res.status(200).json({
                            message: 'LOGINSUCCESS',
                            email: user.email,
                            access_token
                        })
                    } else {
                        next({
                            status: 400,
                            name: 'LOGINFAILED',
                            message: 'invalid username/password'
                        })
                    }
                } else {
                    next({
                        status: 400,
                        name:'LOGIN FAILED',
                        message: 'register first or retry to login'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController