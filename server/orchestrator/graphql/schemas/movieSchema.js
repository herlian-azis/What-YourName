const { gql } = require('apollo-server')
const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis()
const myUrl = "http://localhost:2001/movies"

const typeDefs = gql`

type Movie {
    _id:ID
    title: String
    overview: String
    poster_path:String
    popularity:Float
    tags:[String]
  }

  extend type Query {
      movies:[Movie]
      movie(_id:ID):Movie
  }

  input MovieInput {
      title:String
      overview:String
      poster_path:String
      popularity:Float
      tags:[String]
  }
  extend type Mutation{

    addMovie ( movie : MovieInput ) : Movie
    updateMovie(_id:ID,movie:MovieInput):Movie
    deleteMovie(_id:ID):Movie
  }
`



const resolvers = {
    Query: {
        movies: async () => {
            const movies = await redis.get('movies')
            try {
                if (movies) {
                    return JSON.parse(movies)

                } else {
                    const dataMovies = await axios.get(myUrl)
                    await redis.set('movies', JSON.stringify(dataMovies.data))
                    return dataMovies.data
                }
            } catch (error) {
                console.log(error)
            }
        },
        movie: async (_, args) => {
            const movies = await redis.get('movies')
            try {
                if (movies) {
                    return JSON.parse(movies).filter(data => data._id == args._id)[0]
                }
                const id = args._id
                const movie = await axios.get(`${myUrl}/${id}`)
                return movie.data
            } catch (error) {
                console.log(error)
            }
        }
    },
    Mutation: {
        addMovie: async (_, args) => {
            const movies = await redis.get('movies')
            try {
                const movie = await axios.post(myUrl, args.movie)
                const newMovie = JSON.parse(movies).concat(movie.data)
                await redis.set("movies", JSON.stringify(newMovie))
                return movie.data
            } catch (error) {
                console.log(error)
            }
        },
        updateMovie: async (_, args) => {
            const movies = await redis.get('movies')
            try {
                const movie = await axios.put(`${myUrl}/${args._id}`,args.movie)
                const filterMovie = JSON.parse(movies).filter(data => data._id !== args._id)
                const updatedMovie = filterMovie.concat(movie.data)
                await redis.set("movies",JSON.stringify(updatedMovie))
                return movie.data
            } catch (error) {
                console.log(error)
            }
        },
        deleteMovie :async(_,args)=>{
            const movies = await redis.get('movies')
            try {
                const movie =await axios.delete(`${myUrl}/${args._id}`)
                const filterMovie = JSON.parse(movies).filter(data => data._id !== args._id)
                await redis.set('movies',JSON.stringify(filterMovie))
                return movie.data
            } catch (error) {
                console.log(error)
            }
        }

    }
}


module.exports = {
    typeDefs, resolvers
}