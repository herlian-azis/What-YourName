import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from '../components/Card'
import { useQuery } from '@apollo/client';
import { GET_ALL_DATA } from '../querys/entertainQuery';
import { Col, Container } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import FindInPageIcon from '@material-ui/icons/FindInPage';
import Button from '@material-ui/core/Button';


import './Home.css'
const Home = () => {
    const history = useHistory()
    const { loading, error, data } = useQuery(GET_ALL_DATA);
    var settings = {
        dots: false,
        autoplay: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 500,
        // autoplaySpeed: 2000,
        cssEase: "linear"
    };
    const goMovies = () => {
        history.push('/movies')
    }
    const goSerial = () => {
        history.push('/series')
    }


    if (loading) return <p>Loading...</p>
    if (error) return <p>Error! ${error.message}</p>;

    return (
        <div >

            <Container>
                <div className="clearfix mt-5 mb-3">
                    <h4 className="float-left text-light">Movies</h4>
                    <Button
                        variant="contained"
                        startIcon={<FindInPageIcon />}
                        className="float-right text-uppercase " onClick={() => goMovies()}
                    >

                        See All
                     </Button>

                </div>
                <Slider {...settings}>
                    {data.movies.map((movie, idx) => {
                        return (
                            <Col md={3} className='mb-1' >
                                <Card key={idx} idx={idx} data={movie}></Card>
                            </Col>
                        )
                    })}
                </Slider>

                <div>
                    <div className="clearfix mt-5 mb-3">
                        <h4 className="float-left text-light">Tv SERIES</h4>
                        <Button
                            variant="contained"

                            startIcon={<FindInPageIcon />}
                            className="float-right text-uppercase " onClick={() => goSerial()}
                        >

                            See All
                     </Button>


                    </div>
                    <Slider {...settings}>
                        {data.tvSeries.map((serie, idx) => {
                            return (
                                <React.Fragment>
                                    <Col >
                                        <Card key={idx} idx={idx} data={serie}></Card>
                                    </Col>
                                </React.Fragment>
                            )
                        })}
                    </Slider>
                </div>
            </Container>

        </div>
    )
}

export default Home

