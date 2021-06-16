import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Header from "./Components/Header/Header";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import LoginForm from "./Components/LoginForm/LoginForm";
import MainPage from "./Components/MainPage/MainPage";
import AlertComponent from "./Components/AlertComponent/AlertComponent";
import PrivateRoute from "./Components/PrivateRoute";
import AddPost from "./Components/AddPost/AddPost";
import PostPage from "./Components/PostPage/PostPage";
import TagPage from "./Components/TagPage/TagPage";
import SearchPage from "./Components/SearchPage/SearchPage";
import UserProfile from "./Components/UserProfile/UserProfile";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import DeactivateAccount from "./Components/DeactivateAccount/DeactivateAccount";
import Banner from "./Components/Banners/Banner"
import VerticalAd from "./Components/Banners/VerticalAd";


function App() {
    const [title, updateTitle] = useState(null);
    const [errorMessage, updateErrorMessage] = useState(null);
    return (
        <Router>
            <div className="App">
                <Header title={title}/>


                <div className="container-fluid d-flex flex-column pb-5">
                    <div className="row">
                        <div className="col">
                            <VerticalAd imagePath={"http://localhost:3000/banner_left.png"} float={"float-left"}/>
                        </div>
                        <div className="col-8">
                          <Banner imagePath={"http://localhost:3000/banner_top.png"}/>
                            <Switch>
                                <Route path="/" exact={true}>
                                    <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
                                </Route>
                                <Route path="/register">
                                    <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
                                </Route>
                                <Route path="/login">
                                    <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
                                </Route>


                                <PrivateRoute path="/addPost" component={<AddPost showError={updateErrorMessage}/>}/>
                                <PrivateRoute path="/posts/:id" component={<PostPage showError={updateErrorMessage}/>}/>

                                <PrivateRoute path="/profile/:id?"
                                              component={<UserProfile showError={updateErrorMessage}/>}/>

                                <PrivateRoute path="/tags/:tagName?"
                                              component={<TagPage showError={updateErrorMessage}/>}/>

                                <PrivateRoute path="/search/:searchText?"
                                              component={<SearchPage showError={updateErrorMessage}/>}/>

                                <PrivateRoute path="/changePassword"
                                              component={<ChangePassword showError={updateErrorMessage}/>}/>
                                <PrivateRoute path="/deactivateAccount"
                                              component={<DeactivateAccount showError={updateErrorMessage}/>}/>

                                <PrivateRoute exact path="/home" component={<MainPage/>}/>
                            </Switch>
                            <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
                          <Banner imagePath={"http://localhost:3000/banner_bottom.png"}/>
                        </div>
                        <div className="col">
                            <VerticalAd imagePath={"http://localhost:3000/banner_left.png"} float={"float-right"}/>
                        </div>

                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
