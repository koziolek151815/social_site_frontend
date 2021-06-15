import ScrollablePostView from "../ScrollablePostView/ScrollablePostView";
import { withRouter } from "react-router";
import React from "react";
import axios from "axios";
import {formatDate} from "../../Utility/Date";
import {getCachedCurrentUserInfo} from "../../Utility/Cache";


const UserProfileViewState = Object.freeze({"posts":1, "comments":2, "votes":3})

class UserProfile extends React.Component  {
    state = {
        profileData: null,
        currentlyListing: UserProfileViewState.posts,
        isCurrentUserProfile: false
    };

    componentDidMount() {

        if(typeof this.props.match.params.id !== "undefined")
        {
            axios.get(process.env.REACT_APP_BACKEND_URL + `/profile/user?userId=${this.props.match.params.id}`,
                { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} }
            ).then((response)=>{

                this.setState({
                    profileData: response.data
                });

                getCachedCurrentUserInfo().then(response=>{
                        console.log(response);
                        if(response.id === this.state.profileData.id)
                        {
                            this.setState({
                                isCurrentUserProfile: true
                            });
                        }
                    }
                )

            }).catch(()=>{
                window.location = "/home";
            });
        }
        else
        {
            //No id provided go to current user page
            getCachedCurrentUserInfo().then(response=>{
                window.location = "/profile/" + response.id;
            })
        }




    }



    userPostList()
    {
        if(typeof this.props.match.params.id === "undefined") return null;
        switch (this.state.currentlyListing)
        {
            default:
            case UserProfileViewState.posts:
                return <>
                        <h2>User's posts:</h2>
                        <ScrollablePostView key="1" endpoint={"profile/user/posts?userId=" + this.props.match.params.id} sort="id,DESC&votes,DESC"/>
                        </>
            case UserProfileViewState.comments:
                return <>
                        <h2>User's comments:</h2>
                        <ScrollablePostView key="2" endpoint={"profile/user/comments?userId=" + this.props.match.params.id} sort="id,DESC&votes,DESC"/>
                    </>
            case UserProfileViewState.votes:
                return <>
                        <h2>User's votes:</h2>
                        <ScrollablePostView key="3" endpoint={"profile/user/votes?userId=" + this.props.match.params.id} sort="id,DESC&votes,DESC"/>
                    </>

        }
    }

    render() {
        return (
            <div className="App">
                {

                    this.state.profileData !== null ?
                        (
                            <>
                                {
                                    this.state.isCurrentUserProfile?
                                        <>
                                            <h2>{this.state.profileData.username}'s profile (Your profile)</h2>
                                            Profile created at:{formatDate(this.state.profileData.userCreatedDate)}<br/>
                                            Gender:{this.state.profileData.gender}<br/>
                                            Description:{this.state.profileData.profileDescription}<br/>
                                            <a className="btn btn-default text-white bg-danger" href={"/changePassword"}>Change your password</a>
                                            <a className="btn btn-default text-white bg-danger" href={"/deactivateAccount"}>Deactivate your account</a>
                                        </> :
                                        <>
                                            <h2>{this.state.profileData.username}'s profile</h2>
                                            Profile created at:{formatDate(this.state.profileData.userCreatedDate)}<br/>
                                            Gender:{this.state.profileData.gender}<br/>
                                            Description:{this.state.profileData.profileDescription}<br/>
                                        </>
                                }<br/>


                            </>
                        ) :
                        (<h2> {"Loading..."}  </h2>)
                }

                <hr className="mt-3 mb-3"/>

                <button className="btn btn-default text-white bg-dark"
                   onClick={ (e)=>{e.preventDefault();this.setState({currentlyListing: UserProfileViewState.posts});}}
                    disabled={this.state.currentlyListing === UserProfileViewState.posts}>Posts</button>
                <button className="btn btn-default text-white bg-dark"
                   onClick={ (e)=>{e.preventDefault();this.setState({currentlyListing: UserProfileViewState.comments});}}
                    disabled={this.state.currentlyListing === UserProfileViewState.comments}>Comments</button>

                <button className="btn btn-default text-white bg-dark"
                   onClick={ (e)=>{e.preventDefault();this.setState({currentlyListing: UserProfileViewState.votes});}}
                    disabled={this.state.currentlyListing === UserProfileViewState.votes}>Votes</button>


                {this.userPostList()}
            </div>
        );
    }
}

export default withRouter(UserProfile);