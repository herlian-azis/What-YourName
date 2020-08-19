import React from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import { Link  } from "react-router-dom"


export default () => {
    return (
        <>
            <Navbar  bg="primary" expand="lg">
                <Navbar.Brand className='text-white'>What-YourName</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link className='text-white' as={Link} to='/' >Home</Nav.Link>
                        <Nav.Link className='text-white' as={Link} to='/movies' >Movies</Nav.Link>
                        <Nav.Link className='text-white' as={Link} to='/series' >Tv Series</Nav.Link>                            
                        <Nav.Link className='text-white' as={Link} to='/favorites' >My Favorites</Nav.Link>                            
                    </Nav>                 
                </Navbar.Collapse>
            </Navbar>
        </>
    )

}
