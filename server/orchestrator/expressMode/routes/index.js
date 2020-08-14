const router = require('express').Router()
const MoviesController = require('../controllers/moviesController')
const TvSeriesController = require('../controllers/tvSeriesController')
const allMovies = require('../controllers/getAllController')


// console.log("masuk")
router
// movies
    .get('/movies',MoviesController.findAll)
    .get('/movies/:id',MoviesController.findOne)
    .post('/movies',MoviesController.add)
    .put('/movies/:id',MoviesController.update)
    .delete('/movies/:id',MoviesController.delete)

    //tv-series
    .get('/tv-series',TvSeriesController.findAll)
    .get('/tv-series/:id',TvSeriesController.findOne)
    .post('/tv-series',TvSeriesController.add)
    .put('/tv-series/:id',TvSeriesController.update)
    .delete('/tv-series/:id',TvSeriesController.delete)

    .get('/all',allMovies.getAll)

    module.exports = router