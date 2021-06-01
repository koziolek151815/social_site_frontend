import React from "react";
import axios from 'axios';
import './Vote.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

class Vote extends React.Component {

    constructor(props) {
        super(props);
        this.token = localStorage.getItem('token');
        this.ratingRef = React.createRef();
        this.downvoteButtonRef = React.createRef();
        this.upvoteButtonRef = React.createRef();
    }

    syncVote = async () => {
        axios.get(
            process.env.REACT_APP_BACKEND_URL + '/posts/getCurrentUserVote?postId=' +this.props.postId, { headers: {"Authorization" : `Bearer ${this.token}`} }
        ).then((response) => {
            const upvoteButton = this.upvoteButtonRef.current;
            const downvoteButton = this.downvoteButtonRef.current;

            switch (response.data) {
                default:
                case 0:
                    downvoteButton.className = upvoteButton.className = "btn btn-default bg-info";
                    break;
                case 1:
                    downvoteButton.className = "btn btn-default bg-info";
                    upvoteButton.className = "btn btn-default bg-success";
                    break;
                case -1:
                    downvoteButton.className = "btn btn-default bg-danger";
                    upvoteButton.className = "btn btn-default bg-info";
                    break;
            }
        });
    }

    syncRating = ()=> {
        axios.get(
            process.env.REACT_APP_BACKEND_URL + '/posts/getById?postId=' +this.props.postId, { headers: {"Authorization" : `Bearer ${this.token}`} }
        ).then((response) => {
            this.ratingRef.current.innerText = response.data.rating;
        })
        .catch((error) => {
            console.log(error);
            alert("Post download error");
        });

    }

    componentDidMount() {
        this.syncVote()
    }

    sendVote = (vote) => {
        const data = {"vote": vote}

        axios.post(process.env.REACT_APP_BACKEND_URL + '/posts/vote?postId=' +this.props.postId, data,
            { headers: {"Authorization" : `Bearer ${this.token}`} })
            .then((response) => {
                this.syncRating();
                this.syncVote();
            })
            .catch((error) => {
                console.log(error);
                alert("Voting error");
            });
    }

    upvoteClicked = (event) => {
        event.preventDefault();
        this.sendVote(true);
    };

    downvoteClicked = (event) => {
        event.preventDefault();
        this.sendVote(false);
    };

    render() {
        return (
            <span className="Voting">
            <span className="mx-3" ref={this.ratingRef}>{this.props.postRating}</span>
            <button type="button" ref={this.upvoteButtonRef} onClick={this.upvoteClicked}>➕</button>
            <button type="button" ref={this.downvoteButtonRef} onClick={this.downvoteClicked}>➖</button>
        </span>
        );
    }
}

export default Vote;
