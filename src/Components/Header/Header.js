import React from 'react';
import { withRouter } from "react-router-dom";
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import {isLoggedIn} from "../../Utility/Authorization";

function Header() {

    var searchTextRef = React.createRef();

    const logout = () => {
        localStorage.clear();
        window.location.href = '/login';
    }

    const search = (event) => {
        event.preventDefault();
        window.location.href = '/search/' + searchTextRef.value;
    }

    return(
    <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="/home"><img src= {process.env.PUBLIC_URL + "/logo32.png"} alt="Our logo!"/> U Krzysia!</Navbar.Brand>
        {/*<Navbar.Collapse id="responsive-navbar-nav">*/}
            {
                isLoggedIn()?
                    (<Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/addPost" >New Post</Nav.Link>
                        <Nav.Link href="/login" onClick={logout}>Logout</Nav.Link>
                    </Nav>):null
            }

            {
                isLoggedIn()?
                (<>
                    <Nav.Link href="/profile">Your profile</Nav.Link>
                    <Form inline onSubmit={search}>
                        <FormControl ref={(ref) => {searchTextRef = ref}} type="text" placeholder="Search" />
                        <Button onClick={search} variant="outline-info">Search</Button>
                    </Form>
                </>):null
            }

        {/*</Navbar.Collapse>*/}
    </Navbar>
    )
}
export default withRouter(Header);
