import React, { useState, useEffect } from 'react'
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'
import { DELETE_MOVIE, GET_MOVIES } from '../querys/GetMovies'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import Button from '@material-ui/core/Button';
import { green, red, purple } from '@material-ui/core/colors';
import './DetailCard.css'
import ModalEdit from '../components/ModalEdit'
// import DeleteIcon from '@material-ui/icons/Delete';
import FavoritesCache, { GET_FAVORITES } from '../querys/FavoritesCache'
const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: red,
        default: purple,
    },
});
const styles = {
    button: {
        background: "linear-gradient(20deg, #d291bc 50%, #f54291 50%)",
        color: "white",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
    },
    buttonBlue: {
        color: "white",
        background: "linear-gradient(45deg, #2196f3 30%, #21cbf3 50%)",
        boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .30)"
    }
};
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
const DetailCard = (props) => {
    const classes = useStyles();
    const history = useHistory()
    const data = props.data
    const [modalShow, setModalShow] = useState(false);
    const [fav, setFavo] = useState([])
    const [deleted] = useMutation(DELETE_MOVIE, {
        refetchQueries: [
            {
                query: GET_MOVIES
            }
        ]
    })
    const { favorites: currentFavorite } = FavoritesCache.readQuery({
        query: GET_FAVORITES
    })
   


    const deleteMovie = () => {
        deleted({
            variables: { id: data.id }
        })
        history.push('/movies')
    }
    

    useEffect(() => {
        setFavo(currentFavorite)
    }, [currentFavorite])




    const addFav = () => {
      
        FavoritesCache.writeQuery({
            query: GET_FAVORITES,
            data: {
                favorites: [...fav, data]
            }
        })
    }

    let handleFav = []
     fav.map(checkFav => {
        handleFav.push( checkFav.id)
    })

    const handleModal = () => {
        if (props.data.__typename == 'Movie') {

            return (
                <>
                    <MuiThemeProvider theme={theme} >
                        <div className={classes.root}>

                            <Button variant="contained" style={{
                                ...styles.buttonBlue
                            }} onClick={() => setModalShow(true)}>Edit</Button>
                            <Button variant="contained" color="secondary" onClick={() => deleteMovie()}>Delete</Button>
                            <Button
                                disabled={handleFav.includes(data.id)}
                                variant="contained" style={{
                                    ...styles.button
                                }} onClick={() => addFav()}>Favorite</Button>
                        </div>
                    </MuiThemeProvider>

                </>
            )
        }
    }
    return (
        <>
            <div className='full-container'>

                <div className="card-card-container">
                    <div className="card-background u-clearfix">
                        <div className="card-body-detail">
                            <ModalEdit show={modalShow} movie={data} onHide={() => setModalShow(false)} ></ModalEdit>
                            <center>
                                <span className="card-number-detail card-circle-detail subtle">{props.idx}</span>
                            </center>
                            <span className="card-author-detail subtle">{data.tags + ""}</span>
                            <h2 className="card-title-detail">{data.title}</h2>
                            <span className="card-description-detail subtle">{data.overview}</span>
                            <div className="mb-4">Rating: {data.popularity}/10</div>
                            {handleModal()}
                            {/* <span className=" card-circle-detail subtle">{data.popularity}</span> */}
                        </div>
                        <img width="238" height="357px" src={data.poster_path} alt="" className="card-media" />
                    </div>
                    {/* <div className="card-shadow-detail"></div> */}
                </div>

            </div>
        </>
    )
}

export default DetailCard