const TvSeries = require('../models/TvSeries')

module.exports = class TvSeriesControllers{
    static async findAll(req,res){
        try {
            const Tv_series = await TvSeries.findAll()
            res.status(200).json(Tv_series)
        } catch (error) {
            console.log(error)
        }
    }
    static async findOne(req,res){
        try {
            const Tv_series = await TvSeries.findOne(req.params.id)
            res.status(200).json(Tv_series)
        } catch (error) {
            console.log(error)
        }
    }

    static async insertOne(req,res){
        try {
            const newTvSeries= req.body
            const Tv_series = await TvSeries.insertOne(newTvSeries)
            res.status(201).json(Tv_series.ops[0])
        } catch (error) {
            console.log(error)
        }
    }
    static async findOneAndUpdate(req,res){
        try {
            const updateTvSeries =req.body
            const id = req.params.id
            const tv_series = await TvSeries.findOneAndUpdate(id,updateTvSeries)
            res.status(201).json(tv_series.value)
        } catch (error) {
            console.log(error)
        }
    }
    static async findOneAndDelete(req,res){
        try {
            const tv_series = await TvSeries.findOneAndDelete(req.params.id)
            res.status(200).json(tv_series)
        } catch (error) {
            console.log(error)
        }
    }
}