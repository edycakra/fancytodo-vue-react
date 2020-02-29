const axios = require('axios')

class ApiController {
    static getApi (req, res, next) {
        console.log('>>>', process.env.API_KEY)
        axios({
            url: `https://api.airvisual.com/v2/nearest_city?key=${process.env.API_KEY}`,
            method: `GET`,
            responseType: `json`
        })
        .then(cities => {
            res.status(200).json(cities.data)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }
}

module.exports = ApiController