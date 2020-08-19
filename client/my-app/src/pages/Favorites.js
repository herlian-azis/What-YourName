import React from 'react'
import FavoritesCache, { GET_FAVORITES } from '../querys/FavoritesCache'
import Card from '../components/Card'
import { Container, Row, Col } from 'react-bootstrap'

const Favorites = () => {
    const { favorites } = FavoritesCache.readQuery({
        query: GET_FAVORITES
    })

    return (
        <>
            <center>
                <h1 className=" mt-5 text-light">All Favorites</h1>
            </center>
            <Container>
                <Row>
                    {favorites.map((fav,idx) => {
                        return (
                            <Col md={3} className='mb-5'>
                                <Card data={fav} idx={idx} />
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </>
    )
}


export default Favorites