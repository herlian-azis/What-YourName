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

            <div class="wrapper">
                <div class="card">
                    <img src={data.poster_path} />
                    <div class="descriptions">
                        <h1>{data.title}</h1>
                        <p>
                            {data.overview}
                        </p>
                        <Button startIcon={<DetailsIcon />} variant="outlined" color="primary" onClick={goToDetail}>See Detail</Button>
                    </div>
                </div>
               

            </div>
            {/* <footer>
                <p>
                    Created with <i class="fa fa-heart"></i> by
          <a target="_blank" href="https://codepen.io/ahmadbassamemran/">Ahmad Emran</a>
          Follow me :
          <a target="_blank" href="https://www.instagram.com/ahmadbassamemran/"><i class="fab fa-instagram"></i></a>
                    <a target="_blank" href="https://www.linkedin.com/in/ahmademarn/"><i class="fab fa-linkedin"></i></a>
                    <a target="_blank" href="https://codepen.io/ahmadbassamemran/"><i class="fab fa-codepen"></i></a>
                    <a target="_blank" href="https://dev.to/ahmadbassamemran"><i class="fab fa-dev"></i></a>
                    <a target="_blank" href="https://twitter.com/ahmadbassamemra"><i class="fab fa-twitter-square"></i></a>
                </p>
            </footer>

            <div class="youtubeBtn">

                <a target="_blank" href="https://www.youtube.com/AhmadEmran?sub_confirmation=1">
                    <span>Watch on YouTube</span>
                    <i class="fab fa-youtube"></i>
                </a>

            </div> */}
        </>
        // </div>
    )
}

export default Card2