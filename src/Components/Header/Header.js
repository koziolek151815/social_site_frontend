import React from 'react';
import { withRouter } from "react-router-dom";
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';

function Header() {

    var searchTextRef = React.createRef();

    const logout = () => {
        localStorage.clear();
        window.location.href = '/login';
    }

    const search = () => {
        window.location.href = '/search/' + searchTextRef.value;
    }

    return(
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Kris welcomes you!</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/addPost" >AddPost</Nav.Link>
            <Nav.Link href="/login" onClick={logout}>Logout</Nav.Link>

        </Nav>
        <Form inline>
            <FormControl ref={(ref) => {searchTextRef = ref}} type="text" placeholder="Search" className="mr-sm-2" />
            <Button onClick={search} variant="outline-info">Search</Button>
        </Form>
    </Navbar>
    )
}
export default withRouter(Header);
