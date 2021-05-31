import React, {useEffect, useState} from "react";
import axios, * as others from 'axios';
import {Link} from "react-router-dom";
import './Vote.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

function Vote(props) {
    const token = localStorage.getItem('token');

    const syncVote = async () => {
        const voteResponse = axios.get(
            process.env.REACT_APP_BACKEND_URL + '/posts/getCurrentUserVote?postId=' +props.postId, { headers: {"Authorization" : `Bearer ${token}`} }
        ).then((response) => {
            const upvoteButton = document.getElementById("upvoteButton" + props.postId);
            const downvoteButton = document.getElementById("downvoteButton" + props.postId);

            switch (response.data) {
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

    const syncRating = ()=> {
        axios.get(
            process.env.REACT_APP_BACKEND_URL + '/posts/getById?postId=' +props.postId, { headers: {"Authorization" : `Bearer ${token}`} }
        ).then((response) => {
            console.log(response);
            document.getElementById("rating" + props.postId).innerText = response.data.rating;
        })
        .catch((error) => {
            console.log(error);
            alert("Post download error");
        });

    }

    //useEffect(syncVote, []);
    syncVote();

    const sendVote = (vote) => {
        const data = {"vote": vote}

        axios.post(process.env.REACT_APP_BACKEND_URL + '/posts/vote?postId=' +props.postId, data,
            { headers: {"Authorization" : `Bearer ${token}`} })
            .then((response) => {
                console.log(response);

                syncRating();
                syncVote();
            })
            .catch((error) => {
                console.log(error);
                alert("Voting error");
            });
    }

    const upvoteClicked = (event) => {
        event.preventDefault();
        sendVote(true);
    };

    const downvoteClicked = (event) => {
        event.preventDefault();
        sendVote(false);
    };


    return (
        <span className="Voting">
            <span className="mx-3" id={"rating" + props.postId}>{props.postRating}</span>
            <button type="button" id={"upvoteButton" + props.postId} onClick={upvoteClicked}>➕</button>
            <button type="button" id={"downvoteButton" + props.postId} onClick={downvoteClicked}>➖</button>
        </span>
    );
}

export default Vote;
