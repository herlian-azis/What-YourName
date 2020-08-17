import { gql ,useMutation} from '@apollo/client'

export const GET_SERIAL = gql`
query GetAll {
    tvSeries{
      title,
        overview
        id: _id
        poster_path
        popularity
        tags
      }
}


`

export const GET_SERIES_BY_ONE=gql`
query GetSerie($id:ID){
  tvSerie(_id:$id){
    title,
    overview
    id: _id
    poster_path
    popularity
    tags
  }
}

`

export const ADD_SERIAL =gql`
  mutation AddSerial($newMovie :TvSeriesInput ){
    addTvSerie(tvSerie:$newMovie){
      title
    overview
    id: _id
    poster_path
    popularity
    tags
    }
  }

`