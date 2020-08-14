const axios = require('axios')

module.exports = class getAllControllers {
    static async getAll(req, res) {
        try {
            const dataMovies = await axios.get("http://localhost:3001/movies")
            const dataTvSeries = await axios.get("http://localhost:3002/tv-series")
            res.status(200).json({ movies: dataMovies.data, tvSeries: dataTvSeries.data })
        } catch (error) {
            console.log(error)
        }
    }
}