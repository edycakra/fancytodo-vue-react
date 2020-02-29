const axios = require('axios')

class ApiController {
    static getApi (req, res, next) {
        axios({
            url: `https://api.airvisual.com/v2/nearest_city?key=${process.env.API_KEY}`,
            method: `GET`,
            responseType: `json`
        })
        .then(data => {
            res.status(200).json({data})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ApiController