import React from 'react'
import FavoritesCache,{GET_FAVORITES} from '../querys/FavoritesCache'
import Card from '../components/Card'

const Favorites =()=>{
const {favorites} = FavoritesCache.readQuery({
    query: GET_FAVORITES
})

    return(
        <>
    <h1>favvv</h1>


{favorites.map((fav)=>{
return <Card data={fav}/>

})}
    {/* {JSON.stringify(favorites)} */}

        </>
    )
}


export default Favorites