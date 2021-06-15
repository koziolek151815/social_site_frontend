import React, {useState} from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";


function DeactivateAccount(props) {

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
        props.showError(null)

        const payload={
            "password":state.password
        }

        axios.post(process.env.REACT_APP_BACKEND_URL + '/users/deactivateUser', payload,
            { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
            .then(function (response) {
                console.log(response);
                if(response.status === 200){
                    setState(prevState => ({
                        ...prevState,
                        successMessage: 'Your account has been deactivated!'
                    }))
                    props.showError(null);
                }

            })
            .catch(function (error) {
                console.log(error);
                props.showError("Old password is wrong!");
            });
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        var error = false;

        if(!(state.password.length > 0)){
            props.showError('Type in your password!');
            error = true;
        }

        if (!error){
            sendDetailsToServer()
        }
    }
    return(
        <div className="card mt-3 p-3">
            <form>
                <h2>Deactivating your account!</h2>
                Are you sure you want to deactivate your account? (You cannot undo this.)<br/>



                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Type in your password to confirm.</label>
                    <input type="password"
                           className="form-control"
                           id="password"
                           placeholder="Password"
                           value={state.password}
                           onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-danger"
                    onClick={handleSubmitClick}
                >
                    Deactivate account
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>

        </div>
    )
}

export default withRouter(DeactivateAccount);
