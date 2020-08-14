const router = require('express').Router()
const MoviesController = require('../controllers/MovieControllers')
const TvSeriesController = require('../controllers/TvSeriesControllers')


console.log("masuk")
router
// movies
    .get('/movies',MoviesController.findAll)
    .get('/movies/:id',MoviesController.findOne)
    .post('/movies',MoviesController.insertOne)
    .put('/movies/:id',MoviesController.findOneAndUpdate)
    .delete('movies/:id',MoviesController.findOneAndDelete)

    //tv-series
    .get('/tv-series',TvSeriesController.findAll)
    .get('/tv-series/:id',TvSeriesController.findOne)
    .post('/tv-series',TvSeriesController.insertOne)
    .put('/tv-series/:id',TvSeriesController.findOneAndUpdate)
    .delete('/tv-series/:id',TvSeriesController.findOneAndDelete)

    module.exports = router