import React, {  } from 'react'
import { GET_MOVIES_BY_ONE } from '../querys/GetMovies'
import { GET_SERIES_BY_ONE } from '../querys/GetSerial'
import { useQuery } from '@apollo/client'
import { useParams ,useLocation } from 'react-router-dom'
import DetailCard from '../components/DetailCard'

const Detail = () => {
    const { id } = useParams()
    const idx = useLocation().state.data

    const { loading, error, data:dataMovies } = useQuery(GET_MOVIES_BY_ONE, {
        variables: { id }
    })
    const { loading:Load, error:err, data:dataSeries } = useQuery(GET_SERIES_BY_ONE, {
        variables: { id }
    })

    if (loading) return <p>Loading...</p>
    
    if (Load) return <p>Loading...</p>
    
    const data =()=>{
        if (dataSeries.tvSerie != null) {
            return dataSeries.tvSerie   
        }else if(dataMovies){
            return dataMovies.movie
        }
    }
    
    if (error) return <p>Error! ${error.message}</p>;
    if (err) return <p>Error! ${error.message}</p>;
    return (
        <div className='mt-4'>
            <br></br>
            <br></br>
            <br></br>
            <DetailCard data={data()}  idx={idx}></DetailCard>
        </div>
    )
}
export default Detail