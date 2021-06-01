import React from 'react';
import { withRouter } from "react-router-dom";
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';

function Header(props) {

    const logout = () => {
        localStorage.clear();
        window.location.href = '/login';
    }

    return(
        /*<nav className="navbar navbar-dark bg-primary">
            <div className="row col-12 d-flex justify-content-center text-white">
                <span className="h3">{props.title || title}</span>
            </div>
            <div className="text-white">
                <a href="#" onClick={logout}>LOGOUT</a>
            </div>
        </nav>*/
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Kris welcomes you!</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/addPost" >AddPost</Nav.Link>
            <Nav.Link href="/login" onClick={logout}>Logout</Nav.Link>

        </Nav>
        <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
        </Form>
    </Navbar>
    )
}
export default withRouter(Header);
