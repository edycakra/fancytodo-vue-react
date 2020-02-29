const {User, Todo} = require('../models')
const jwt = require('jsonwebtoken')

authentication = (req, res, next) => {
    let decoded = jwt.verify(req.headers.access_token, process.env.SECRET)
    User
        .findOne({where: {id: decoded.id}})
        .then(user => {
            if (user) {
                req.decoded = decoded
                next()
            } else {
                next({
                    status: 400,
                    name: 'LOGIN FAILED',
                    message: 'register first'
                })
            }
        })
        .catch(err => {
            next(err)
        })
}

authorizaton = (req, res, next) => {

}

module.exports = { authentication, authorizaton }