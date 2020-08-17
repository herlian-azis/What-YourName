import React from 'react'
import { Card, Button } from 'react-bootstrap'
import{useHistory} from 'react-router-dom'




const CardComponent = (props) => {
    const data = props.data
    const [modalShow, setModalShow] = React.useState(false);
    // const { loading, error, data:dataMovies } = useQuery(GET_MOVIES_BY_ONE, {
    //     variables: { id :data.id }
    // })
    const history = useHistory()
    
    const goToDetail = ()=>{
    history.push({pathname:`/detail/${data.id}`,
    state:{data:props.idx+1}})
    }

    return (
        <>
            <Card  className="shadow" style={{ width: '15rem' }}>
                <Card.Img variant="top" src={data.poster_path} />
                <Card.Body>
                    <Card.Title>{data.title}</Card.Title>
                    {/* <Card.Text>
                       {data.overview}
    </Card.Text> */}
                    <Button variant="primary" onClick={goToDetail}>See Detail</Button>
                   
                </Card.Body>
            </Card>
        </>
    )
}

export default CardComponent