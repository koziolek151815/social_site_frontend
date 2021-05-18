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

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
      <Router>
        <div className="App">
          <Header title={title}/>
          <div className="container d-flex flex-column">
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
              <PrivateRoute exact path="/home" component={MainPage} />
              <PrivateRoute path="/addPost" component={AddPost} />
              <PrivateRoute path="/posts/:id" component={PostPage} />
            </Switch>
            <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
          </div>
        </div>
      </Router>
  );
}

export default App;
