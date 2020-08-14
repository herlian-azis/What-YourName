const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()
const myUrl = `http://localhost:3002/tv-series`


module.exports = class tvSeriesController {
    static async findAll(req, res) {
        try {
            const tvSeries = await redis.get('tvSeries')
            if (tvSeries) {
                res.status(200).json(JSON.parse(tvSeries))
            } else {
                const dataSeries = await axios.get(`${myUrl}`)
                const setSeries = await redis.set('tvSeries', JSON.stringify(dataSeries.data))
                res.status(200).json(setSeries.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    static async findOne(req, res) {
        try {
            const tvSeries = await redis.get('tvSeries')
            if (tvSeries) {
                const serial = await JSON.parse(tvSeries).filter(data => data._id == req.params.id)
                res.status(200).json(serial[0])
            } else {
                const serialByone = await axios.get(`${myUrl}/${req.params.id}`)
                res.status(200).json(serialByone.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    static async add(req, res) {
        const {
            title, overview,
            poster_path,
            popularity, tags
        } = req.body

        try {
            const addSerial = await axios.post(`${myUrl}`, {
                title, overview,
                poster_path,
                popularity, tags
            })

            const tvSeries = await redis.get('tvSeries')
            const newSeries = JSON.parse(tvSeries).concat(addSerial.data)
            await redis.set('tvSeries', JSON.stringify(newSeries))
            res.status(201).json(addSerial.data)
        } catch (error) {
            console.log(error)
        }
    }
    static async update(req, res) {
        const {
            title, overview,
            poster_path,
            popularity, tags
        } = req.body
        try {
            const updateSeries = await axios.put(`${myUrl}/${req.params.id}`,
                {
                    title, overview,
                    poster_path,
                    popularity, tags
                })
            const tvSeries = await redis.get('tvSeries')
            const filter = JSON.parse(tvSeries).filter(data => data._id !== req.params.id)
            const updated = filter.concat(updateSeries.data)
            await redis.set('tvSeries', JSON.stringify(updated))
            res.status(200).json(updateSeries.data)
            
            
        } catch (error) {
            console.log(error)
        }
    }
    static async delete(req, res) {
       
        try {
            const tvSeries = await redis.get('tvSeries')
            const deleted = await axios.delete(`${myUrl}/${req.params.id}`)
            const filter = JSON.parse(tvSeries).filter(data => data._id !== req.params.id)
            await redis.set('tvSeries',JSON.stringify(filter))
            res.status(200).json(deleted.data)

        } catch (error) {
            console.log(error)
        }
    }


}