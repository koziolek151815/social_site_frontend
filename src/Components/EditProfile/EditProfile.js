import React, {useEffect, useState} from "react";
import axios from "axios";
import {getCachedCurrentUserInfo, resetCurrentUserInfo} from "../../Utility/Cache";


function EditProfile(props) {

    const [state, setState] = useState({
        username: "",
        gender: '',
        profileDescription: '',
        successMessage: null
    });

    useEffect(() => {
        getCachedCurrentUserInfo().then(response => {
            setState(response)
        })
    }, [])


    const handleChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const sendDetailsToServer = () => {
        if (state.username.length) {

            props.showError(null);
            const payload = {
                "username": state.username,
                "gender": state.gender,
                "profileDescription": state.profileDescription
            }
            axios.put(process.env.REACT_APP_BACKEND_URL + '/profile/updateProfile', payload,
                {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}})
                .then(function (response) {
                    console.log(response);
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Updating profile successful.'
                        }))
                        resetCurrentUserInfo();
                        window.location = "/profile";
                        props.showError(null);
                    } else if (response.status === 500) {
                        console.log(response);
                        props.showError("Updating profile failed");
                    } else {
                        console.log(response);
                        props.showError("Something went wrong");
                    }
                })
                .catch(function (error) {
                    props.showError("Some error occured");

                });
        } else {
            props.showError('Please enter valid data.')
        }

    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        let error = false;

        if (!(state.username.length > 4)) {
            props.showError('Username is too short');
            error = true;
        }
        if (!error) {
            sendDetailsToServer()
        }
    }


    return (
        <div className="EditProfile">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputUsername1">Username</label>
                    <input className="form-control"
                           type="text"
                           id="username"
                           placeholder="Username"
                           defaultValue={state.username}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputDescription">Description</label>
                    <input type="text"
                           className="form-control"
                           id="profileDescription"
                           placeholder="Description"
                           defaultValue={state.profileDescription}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputSex1">Gender</label>
                    <input className="form-control"
                           type="text"
                           id="gender"
                           placeholder="Gender"
                           defaultValue={state.gender}
                           onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Save
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none'}}
                 role="alert">
                {state.successMessage}
            </div>

        </div>


    );
}

export default EditProfile;