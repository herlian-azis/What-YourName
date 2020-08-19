import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Button } from 'react-bootstrap'
import Card2 from '../components/Card'
import { useQuery } from '@apollo/client';
import { GET_MOVIES } from '../querys/GetMovies'
import Modal from '../components/Modal'
const Movies = () => {
    const { loading, error, data } = useQuery(GET_MOVIES);
    const [modalShow, setModalShow] = React.useState(false);
    const [currentPage, setCurrentPage] = useState([])
    const [ces, setCes] = useState('')

    useEffect(() => {
        if (modalShow == false) {
            setCes('')

        }

    }, [modalShow])
    const rowEvents = (cek) => {
        setModalShow(true)
        setCurrentPage(cek)
        setCes('mov')
    }


    // console.log("cek")
    // console.log(currentPage)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error! ${error.message}</p>;
    return (
        <>
          

            <Modal show={modalShow}
                movie={currentPage}
                ces={ces}
                onHide={() => setModalShow(false)} />


            <Container>
            <div className="clearfix mt-5 mb-3">
                <h4 className="float-left text-light">Movies</h4>
                <Button className="float-right text-uppercase text-light"
                    onClick={() => setModalShow(true)}
                >
                    Add Movie
            </Button>
            </div>
                <Row>
                    {data.movies.map((movie, idx) => {
                        return (
                            <Col md={3} className='mb-5'>
                                <Card2
                                    onPages={page => rowEvents(page)}
                                    key={idx} idx={idx} data={movie} />
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </>
    )
}

export default Movies

