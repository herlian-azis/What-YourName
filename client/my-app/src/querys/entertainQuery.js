import { gql } from '@apollo/client'

export const GET_ALL_DATA = gql`
query GetAll {
    tvSeries{
        title
        id: _id
        poster_path
        popularity
        tags
        
      }
      movies{
      title,
        overview
        id: _id
        poster_path
        popularity
        tags
      }
}
`