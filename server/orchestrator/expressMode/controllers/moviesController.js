const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()
const myUrl = `http://localhost:3001/movies`


module.exports = class MoviesController {
    static async findAll(req, res) {
        try {
            const movies = await redis.get('movies')
            if (movies) {
                res.status(200).json(JSON.parse(movies))
            } else {
                const dataMovies = await axios.get(`${myUrl}`)
                const setMovies =  redis.set('movies', JSON.stringify(dataMovies.data))
                res.status(200).json(setMovies.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    static async findOne(req, res) {
        try {
            const movies = await redis.get('movies')
            if (movies) {
                const movie = await JSON.parse(movies).filter(data => data._id == req.params.id)
                res.status(200).json(movie[0])
            } else {
                const movieByone = await axios.get(`${myUrl}/${req.params.id}`)
                res.status(200).json(movieByone.data)
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
            const addMovie = await axios.post(`${myUrl}`, {
                title, overview,
                poster_path,
                popularity, tags
            })

            const redisMovie = await redis.get('movies')
            const newMovie = JSON.parse(redisMovie).concat(addMovie.data)
            await redis.set('movies', JSON.stringify(newMovie))
            res.status(201).json(addMovie.data)
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
            const updateMovie = await axios.put(`${myUrl}/${req.params.id}`,
                {
                    title, overview,
                    poster_path,
                    popularity, tags
                })
            const movies = await redis.get('movies')
            const filter = JSON.parse(movies).filter(data => data._id !== req.params.id)
            const updated = filter.concat(updateMovie.data)
            await redis.set('movies', JSON.stringify(updated))
            res.status(200).json(updateMovie.data)
            
            
        } catch (error) {
            console.log(error)
        }
    }
    static async delete(req, res) {
        console.log(req.params.id)
        console.log('cek masukkkk')
        try {
            const movies = await redis.get('movies')
            const deleted = await axios.delete(`${myUrl}/${req.params.id}`)
            const filter = JSON.parse(movies).filter(data => data._id !== req.params.id)
            await redis.set('movies',JSON.stringify(filter))
            res.status(200).json(deleted.data)

        } catch (error) {
            console.log(error)
        }
    }


}