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
import EditProfile from "./Components/EditProfile/EditProfile";


function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
      <Router>
        <div className="App" >
          <Header title={title}/>
          <div className="container d-flex flex-column pb-5">

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

              <PrivateRoute path="/profile/:id?" component={<UserProfile showError={updateErrorMessage}/>}/>

              <PrivateRoute path="/tags/:tagName?" component={<TagPage showError={updateErrorMessage}/>}/>

              <PrivateRoute path="/search/:searchText?" component={<SearchPage showError={updateErrorMessage}/>}/>

              <PrivateRoute path="/editProfile" component={<EditProfile showError={updateErrorMessage}/>}/>
              <PrivateRoute path="/changePassword" component={<ChangePassword showError={updateErrorMessage}/>}/>
              <PrivateRoute path="/deactivateAccount" component={<DeactivateAccount showError={updateErrorMessage}/>}/>

              <PrivateRoute exact path="/home" component={<MainPage/>} />
            </Switch>
            <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
            <img src= {process.env.PUBLIC_URL + "/logo64.png"} alt="ad"/>
          </div>
        </div>
      </Router>
  );
}

export default App;
