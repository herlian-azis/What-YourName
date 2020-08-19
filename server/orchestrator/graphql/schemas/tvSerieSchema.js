const { gql } = require('apollo-server')
const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis()
const myUrl = "http://localhost:2002/tv-series"

const typeDefs = gql`

type TvSeries {
    _id:ID
    title: String
    overview: String
    poster_path:String
    popularity:Float
    tags:[String]
  }

  extend type Query {
      tvSeries:[TvSeries]
      tvSerie(_id:ID):TvSeries
    }
    input TvSeriesInput {
        title:String
        overview:String
        poster_path:String
        popularity:Float
        tags:[String]
    }
    extend type Mutation{
  
      addTvSerie ( tvSerie : TvSeriesInput ) : TvSeries
      updateTvSerie(_id:ID,tvSerie:TvSeriesInput):TvSeries
      deleteTvSerie(_id:ID):TvSeries
    
    }
    `



const resolvers = {
    Query: {
        tvSeries: async () => {
            const tvSeries = await redis.get('tvSeries')
            try {
                if (tvSeries) {
                    return JSON.parse(tvSeries)

                } else {
                    const dataTvSeries = await axios.get(myUrl)
                    await redis.set('tvSeries', JSON.stringify(dataTvSeries.data))
                    return dataTvSeries.data
                }
            } catch (error) {
                console.log(error)
            }
        },
        tvSerie: async (_, args) => {
            const tvSeries = await redis.get('tvSeries')
            try {
                if (tvSeries) {
                    return JSON.parse(tvSeries).filter(data => data._id == args._id)[0]
                }
                const id = args._id
                const tvSerie = await axios.get(`${myUrl}/${id}`)
                return tvSerie.data
            } catch (error) {
                console.log(error)
            }
        }
    },
    Mutation: {
        addTvSerie: async (_, args) => {
            const tvSeries = await redis.get('tvSeries')
            try {
                const tvSerie = await axios.post(myUrl, args.tvSerie)
                const newTvSerie = JSON.parse(tvSeries).concat(tvSerie.data)
                await redis.set("tvSeries", JSON.stringify(newTvSerie))

                return tvSerie.data
            } catch (error) {
                console.log(error)
            }
        },
        updateTvSerie: async (_, args) => {
            const tvSeries = await redis.get('tvSeries')
            try {
                const tvSerie = await axios.put(`${myUrl}/${args._id}`, args.tvSerie)
                const filterTvSerie = JSON.parse(tvSeries).filter(data => data._id !== args._id)
                const updatedTvSerie = filterTvSerie.concat(tvSerie.data)
                await redis.set("tvSeries", JSON.stringify(updatedTvSerie))
                return tvSerie.data
            } catch (error) {
                console.log(error)
            }
        },
        deleteTvSerie: async (_, args) => {
            const tvSeries = await redis.get('tvSeries')
            try {
                const tvSerie = await axios.delete(`${myUrl}/${args._id}`)
                const filterTvSerie = JSON.parse(tvSeries).filter(data => data._id !== args._id)
                await redis.set('tvSeries', JSON.stringify(filterTvSerie))
                return tvSerie.data.value
            } catch (error) {
                console.log(error)
            }
        }

    }
}


module.exports = {
    typeDefs, resolvers
}