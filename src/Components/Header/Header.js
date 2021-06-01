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

    const search = () => {
        window.location.href = '/search/' + searchTextRef.value;
    }

    return(
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/home"><img src= {process.env.PUBLIC_URL +"/logo32.png"} alt="Our logo!"></img> U Krzysia!</Navbar.Brand>
        <Nav className="mr-auto">
            {
                isLoggedIn()?
                    (<>
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/addPost" >New Post</Nav.Link>
                        <Nav.Link href="/login" onClick={logout}>Logout</Nav.Link>
                    </>):null
            }

        </Nav>
        {
            isLoggedIn()?
            (<>
                <Form inline>
                    <FormControl ref={(ref) => {searchTextRef = ref}} type="text" placeholder="Search" />
                    <Button onClick={search} variant="outline-info">Search</Button>
                </Form>
            </>):null
        }
    </Navbar>
    )
}
export default withRouter(Header);
