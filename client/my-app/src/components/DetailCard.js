import React, { useState } from 'react'
import './DetailCard.css'
import { Button } from 'react-bootstrap'
import ModalEdit from '../components/ModalEdit'
import {DELETE_MOVIE} from '../querys/GetMovies'
import { useMutation } from '@apollo/client'

const DetailCard = (props) => {
    const data = props.data
    const [modalShow, setModalShow] = React.useState(false);

const [deleted] = useMutation(DELETE_MOVIE)
    console.log(data.id)

    const deleteMovie=()=>{
        deleted({
            variables:{id:data.id}
        })
    }
    return (
        <>
            <div className='full-container'>

                <div className="card-card-container">
                    <div className="card-background u-clearfix">
                        <div className="card-body-detail">
                            <span className="card-number-detail card-circle-detail subtle">{props.idx}</span>
                            <ModalEdit show={modalShow} movie={data} onHide={() => setModalShow(false)} ></ModalEdit>
                            <Button onClick={() => setModalShow(true)}>Edit</Button>
                            <Button  onClick={() => deleteMovie() }>ma</Button>
                            <span className="card-author-detail subtle">{data.tags + ""}</span>
                            <h2 className="card-title-detail">{data.title}</h2>
                            <span className="card-description-detail subtle">{data.overview}</span>
                            <div className="">{data.popularity}/10</div>
                            {/* <span className=" card-circle-detail subtle">{data.popularity}</span> */}
                        </div>
                        <img width="238" height="357px" src={data.poster_path} alt="" className="card-media" />
                    </div>
                    <div className="card-shadow-detail">delte</div>
                </div>

            </div>
        </>
    )
}

export default DetailCard