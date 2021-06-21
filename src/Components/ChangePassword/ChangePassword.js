import React, {useState} from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";


function ChangePassword(props) {

    const [state , setState] = useState({
        oldPassword: "",
        password : "",
        confirmPassword: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = () => {
        if(state.oldPassword.length && state.password.length&& state.confirmPassword.length) {

            props.showError(null);
            const payload={
                "oldPassword":state.oldPassword,
                "newPassword":state.password,
            }
            axios.post(process.env.REACT_APP_BACKEND_URL + '/users/changePassword', payload,
                { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
                .then(function (response) {
                    console.log(response);
                    if(response.status === 200){
                        setState(prevState => ({
                            ...prevState,
                            successMessage: 'Password has been changed!'
                        }))
                        props.showError(null);
                    }

                    else if (response.status === 500){
                        console.log(response);
                        props.showError("Password change failed!");
                    }
                    else{
                        console.log(response);
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    props.showError("Old password is wrong!");
                });
        } else {
            props.showError('Please fill out the form!')
        }

    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        var error = false;
        if(!(state.password === state.confirmPassword)) {
            props.showError('Passwords do not match');
            error = true;
        }

        if(!(state.password.length > 4)){
            props.showError('New password is too short');
            error = true;
        }

        if (!error){
            sendDetailsToServer()
        }
    }
    return(
        <div className="card mt-3 p-3">
            <form>
                <h2>Password change form</h2>

                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Old Password</label>
                    <input className="form-control"
                           type="password"
                           id="oldPassword"
                           placeholder="Old password"
                           value={state.oldPassword}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                           className="form-control"
                           id="password"
                           placeholder="Password"
                           value={state.password}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password"
                           className="form-control"
                           id="confirmPassword"
                           placeholder="Confirm Password"
                           value={state.confirmPassword}
                           onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-danger"
                    onClick={handleSubmitClick}
                >
                    Change password
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>

        </div>
    )
}

export default withRouter(ChangePassword);
