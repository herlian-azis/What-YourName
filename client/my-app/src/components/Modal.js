import React, { useState, createRef, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client';
import { ADD_MOVIE, GET_MOVIES, UPDATE_MOVIE } from '../querys/GetMovies'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { flavourOptions } from './dummy'

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
    console.log({ ...props.movie })
    // console.log(props.movie,'2')
    // console.log(props)
    // if (props.movie.id == che) {
    //     console.log(true)
    // }
    const wrapper = createRef()
    const classes = useStyles();
    const [addMovie, { data, loading, error }] = useMutation(ADD_MOVIE, {
        // refetchQueries:[
        //     {
        //         query:GET_MOVIES
        //     }
        // ]
    })
    // const [updateMovie, { error:errorUpdate }] = useMutation(updateMovie)

const [input, setInput] = useState({
    title: "",
    overview: "",
    poster_path: "",
    popularity: "",
    tags: []
})

// useEffect(() => {

// }, [inputTag])
// console.log(props.movie == true)
// if (props.movie != null && props.movie.length != 0) {
//    console.log(props.movie,'ini props')
//     let che ={...props.movie}
//     console.log(che.title,'che')
//     const inputTag = { ...input, title: che.title }
//     setInput(inputTag)
//     console.log(inputTag,'data')
// }

useEffect(() => {


}, [])

// console.log(input)

// console.log(input)
const onChange = (e) => {
    console.log(e)
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

// console.log(input, 'cekk')
const goSubmit = (e) => {
    e.preventDefault()
    addMovie({
        variables: {
            newMovie: input
        }
    })
    // updateMovie({
    //     variables:{id: "ini id ", update:input}
    // })
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
                <h4>Centered Modal</h4>
                <form className={classes.root} onSubmit={(e) => goSubmit(e)} >
                    <TextField value={input.title} onChange={onChange} margin="normal" style={{ margin: 10 }} id="standard-full-width" name="title" label="Title" />
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
                    <Button type="submit">
                        submit
                        </Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    </div>
);
}

export default ModalForm
