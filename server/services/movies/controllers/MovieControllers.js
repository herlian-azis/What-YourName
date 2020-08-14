const Movie = require('../models/Movies')

module.exports = class MovieControllers{
    static async findAll(req,res){
        try {
            const movies = await Movie.findAll()
            res.status(200).json(movies)
        } catch (error) {
            console.log(error)
        }
    }
    static async findOne(req,res){
        try {
            const movie = await Movie.findOne(req.params.id)
            res.status(200).json(movie)
        } catch (error) {
            console.log(error)
        }
    }

    static async insertOne(req,res){
        try {
            const newMovie = req.body
            const movie = await Movie.insertOne(newMovie)
            res.status(201).json(movie.ops[0])
        } catch (error) {
            console.log(error)
        }
    }
    static async findOneAndUpdate(req,res){
        try {
            const updateMovie =req.body
            const id = req.params.id
            const movie = await Movie.findOneAndUpdate(id,updateMovie)
            res.status(201).json(movie.value)
        } catch (error) {
            console.log(error)
        }
    }
    static async findOneAndDelete(req,res){
        try {
            const {value} = await Movie.findOneAndDelete(req.params.id)
            res.status(200).json(value)
        } catch (error) {
            console.log(error)
        }
    }
}