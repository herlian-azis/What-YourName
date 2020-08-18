import React, { useState, createRef, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client';
import { ADD_MOVIE, GET_MOVIES, UPDATE_MOVIE } from '../querys/GetMovies'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { flavourOptions } from './dummy'
import { Alert } from '@material-ui/lab';

const animatedComponents = makeAnimated();

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '75%',
        },

    },
}));
const ModalEdit = (props) => {
    console.log(props.movie.title)
    const wrapper = createRef()
    const classes = useStyles();
    const [alert, setAlert] = useState(false);

    // const [addMovie, { data, loading, error }] = useMutation(ADD_MOVIE, {
    // refetchQueries:[
    //     {
    //         query:GET_MOVIES
    //     }
    // ]
    // })
    const [updateMovie, { error: errorUpdate }] = useMutation(UPDATE_MOVIE, {
        refetchQueries: [
            {
                query: GET_MOVIES
            }
        ]
    })

    const [input, setInput] = useState({
        title: "",
        overview: "",
        poster_path: "",
        popularity: "",
        tags: []
    })


    useEffect(() => {
        if (props.movie) {
            setInput({
                title: props.movie.title,
                overview: props.movie.overview,
                poster_path: props.movie.poster_path,
                popularity: props.movie.popularity,
            })
        }

    }, [props.movie])
    const generateTag = () => {

        let result = props.movie.tags.map((data) => {
            return { value: data, label: data }
        })

        return result
    }

    const onChange = (e) => {
        if (Array.isArray(e)) {
            let newTags = []
            e.map(tag => {
                newTags.push(tag.value)
            })
            const inputTag = { ...input, tags: newTags }
            setInput(inputTag)
        } else if (e != null) {
            let { name, value } = e.target
            if (name == "popularity") {
                value = +value
            }
            const inputSet = { ...input, [name]: value }
            setInput(inputSet)
        }
    }

    const goSubmit = (e) => {
        e.preventDefault()


        if (input.title == "" ||
            input.overview == "" ||
            input.popularity == "" ||
            input.poster_path == "" ||
            input.tags == []) {
            setAlert(true);
        } else {

            updateMovie({
                variables: { id: props.movie.id, update: input }
            })
        }
    }

    return (
        <div >
            <Modal
                ref={wrapper}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>

                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Movies
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center>

                        {alert ? <Alert severity="error">All Fields Are Required!</Alert> : null}
                        <h4>Edit Data</h4>
                        <form className={classes.root} onSubmit={(e) => goSubmit(e)} >
                            <TextField value={input.title} onChange={onChange} margin="normal" style={{ margin: 10 }} id="standard-full-width" name="title" label="Title" />
                            <TextField value={input.overview} onChange={onChange} margin="normal" style={{ margin: 10 }} id="standard-full-width" name="overview" label="Overview" />
                            <TextField value={input.poster_path} onChange={onChange} margin="normal" style={{ margin: 10 }} id="standard-full-width" name="poster_path" label="Poster_Path" />
                            <TextField min="0" rowsMax="1" value={input.popularity} type='number' onChange={onChange} margin="normal" style={{ margin: 10 }} id="standard-full-width" name="popularity" label="Popularity" />
                            <div>
                                <Select
                                    isMulti
                                    name="tags"
                                    options={flavourOptions}
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    defaultValue={generateTag()}
                                    onChange={onChange}
                                />
                            </div>
                            <Button type="submit">
                                submit
                        </Button>
                        </form>
                    </center>

                </Modal.Body>
                <Modal.Footer>
                    {/* <Button onClick={props.onHide}>Close</Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalEdit
