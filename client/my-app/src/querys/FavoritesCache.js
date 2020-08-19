import { ApolloClient ,InMemoryCache ,gql} from '@apollo/client'

export const GET_FAVORITES =gql`
    query{
        favorites{
            title,
            overview
            id: _id
            poster_path
            popularity
            tags
        }
    }
`


const client = new ApolloClient({
  uri:`http://localhost:2000`,
  cache: new InMemoryCache()
});

client.writeQuery({
    query : GET_FAVORITES,
    data:{
        favorites:[
            // {
            //     title:'1',
            //     overview:'mantap',
            //     id: '2',
            //     poster_path:'sip',
            //     popularity:2,
            //     tags:[1]   
            // }
        ]
    }
})

export default client