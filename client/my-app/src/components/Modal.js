import React, { useState, createRef } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client';
import { ADD_MOVIE, GET_MOVIES } from '../querys/GetMovies'
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
const ModalForm = (props) => {
    const wrapper = createRef()
    const classes = useStyles();
    const [alert, setAlert] = useState(false);
    const [addMovie, { data, loading, error }] = useMutation(ADD_MOVIE, {
        refetchQueries:[
            {
                query:GET_MOVIES
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
        if (input.title === "" ||
            input.overview === "" ||
            input.popularity === "" ||
            input.poster_path === "" ||
            input.tags === []) {
                // console.log('cek')
            setAlert(true);
        } else {
            addMovie({
                variables: {
                    newMovie: input
                }
            })
            props.onHide()
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
                        Add Movies
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center>
                        {alert ? <Alert severity="error">All Fields Are Required!</Alert> : null}

                        <form className={classes.root} onSubmit={(e) => goSubmit(e)} >
                            <TextField onChange={onChange} margin="normal" style={{ margin: 10 }} id="standard-full-width" name="title" label="Title" />
                            <TextField onChange={onChange} margin="normal" style={{ margin: 10 }} id="standard-full-width" name="overview" label="Overview" />
                            <TextField onChange={onChange} margin="normal" style={{ margin: 10 }} id="standard-full-width" name="poster_path" label="Poster_Path" />
                            <TextField type='number' onChange={onChange} margin="normal" style={{ margin: 10 }} id="standard-full-width" name="popularity" label="Popularity" />
                            <div>
                                <Select
                                    isMulti
                                    name="tags"
                                    options={flavourOptions}
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    onChange={onChange}
                                />
                            </div>

                            <Button style={{ width: '50x' }} type="submit" >
                                submit
                        </Button>
                        </form>
                    </center>

                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="primary" onClick={props.onHide}>
            Save Changes
          </Button> */}
                    {/* <Button onClick={props.onHide}>Close</Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalForm
