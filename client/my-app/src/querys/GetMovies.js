import { gql } from '@apollo/client'

export const GET_MOVIES = gql`
query GetAll {
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

export const GET_MOVIES_BY_ONE = gql`
query GetMovie($id:ID){
  movie(_id:$id){
    title,
    overview
    id: _id
    poster_path
    popularity
    tags
  }
}

`
export const ADD_MOVIE = gql`
  mutation AddMovie($newMovie :MovieInput ){
    addMovie(movie:$newMovie){
      title
      overview
      id: _id
      poster_path
      popularity
      tags
    }
  }
`

export const UPDATE_MOVIE = gql`
    mutation UpdateMovie ($id:ID ,$update : MovieInput ){
      updateMovie(_id:$id , movie:$update){
        title
        overview
        id: _id
        poster_path
        popularity
        tags
      }
    }
`

export const DELETE_MOVIE = gql`
    mutation ($id :ID){
      deleteMovie(_id:$id){
        title
        overview
        id: _id
        poster_path
        popularity
        tags
      }
    }

`


