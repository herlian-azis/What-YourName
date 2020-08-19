import React from 'react'
import './CardStyle.css'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import DetailsIcon from '@material-ui/icons/Details';


const Card2 = (props) => {
    const data = props.data

    const history = useHistory()

    const goToDetail = () => {
        history.push({
            pathname: `/detail/${data.id}`,
            state: { data: props.idx + 1 }
        })
    }
    return (

        <>

            <div className="wrapper">
                <div className="card">
                    <img src={data.poster_path} />
                    <div className="descriptions">
                        <h1>{data.title}</h1>
                        <p>
                            {data.overview}
                        </p>
                        <Button startIcon={<DetailsIcon />} variant="contained" color="primary" onClick={goToDetail}>See Detail</Button>
                    </div>
                </div>
               

            </div>
           
        </>
        // </div>
    )
}

export default Card2