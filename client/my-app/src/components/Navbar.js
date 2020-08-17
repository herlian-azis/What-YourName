import React from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import { Link ,useHistory } from "react-router-dom"


export default () => {
    return (
        <>
            <Navbar bg="info" expand="lg">
                <Navbar.Brand href="#home">What-YourName</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to='/' >Home</Nav.Link>
                        <Nav.Link as={Link} to='/movies' >Movies</Nav.Link>
                        <Nav.Link as={Link} to='/series' >Tv Series</Nav.Link>                            
                    </Nav>                 
                </Navbar.Collapse>
            </Navbar>
        </>
    )

}
