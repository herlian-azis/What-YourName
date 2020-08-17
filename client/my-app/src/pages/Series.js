import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Card from '../components/Card'
import { useQuery } from '@apollo/client';
import { GET_SERIAL } from '../querys/GetSerial'

const Series =()=>{
    const { loading, error, data } = useQuery(GET_SERIAL);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error! ${error.message}</p>;
    return(
        <>
        <Container>
        <div className="clearfix mt-5 mb-3">
                <h4 className="float-left text-light">SERIES</h4>
                
            </div>
                <Row>
                    {data.tvSeries.map((serie,idx) => {
                        return (
                            <Col md={3}  className='mb-5'>
                                <Card ket={serie.id} idx={idx} data={serie} />
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </>
    )
}

export default Series

