import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useQuery } from '@apollo/client';
import { GET_ALL_DATA } from '../querys/entertainQuery';
import { Col, Container } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import FindInPageIcon from '@material-ui/icons/FindInPage';
import Button from '@material-ui/core/Button';
import Card2 from '../components/Card'



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
                <div>
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
                                <Col  >
                                    <Card2 key={movie.id} idx={idx} data={movie}/>
                                </Col>
                            )
                        })}
                    </Slider>
                </div>

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
                                        <Card2 key={serie.id} idx={idx} data={serie}/>
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

