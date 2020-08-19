const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server")
const movies = require('./schemas/movieSchema')
const tvSeries = require('./schemas/tvSerieSchema')
const PORT = 2000
const typeDefs = gql`
    type Query 
    type Mutation
`
const schema = makeExecutableSchema({
    typeDefs: [typeDefs, movies.typeDefs, tvSeries.typeDefs],
    resolvers: [movies.resolvers, tvSeries.resolvers]
})

const server = new ApolloServer({ schema })

server.listen(PORT).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})