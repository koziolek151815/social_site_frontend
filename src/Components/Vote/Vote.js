import React, {useEffect, useState} from "react";
import axios, * as others from 'axios';
import {Link} from "react-router-dom";
import './Vote.css';

function Vote(props) {
    const token = localStorage.getItem('token');

    const syncVote = async () => {
        const voteResponse = axios.get(
            'http://localhost:8081/posts/getCurrentUserVote?postId=' +props.postId, { headers: {"Authorization" : `Bearer ${token}`} }
        ).then((response) => {
            const upvoteButton = document.getElementById("upvoteButton" + props.postId);
            const downvoteButton = document.getElementById("downvoteButton" + props.postId);

            switch (response.data) {
                case 0:
                    downvoteButton.className = upvoteButton.className = "";
                    break;
                case 1:
                    downvoteButton.className = "";
                    upvoteButton.className = "upvoteClicked";
                    break;
                case -1:
                    downvoteButton.className = "downvoteClicked";
                    upvoteButton.className = "";
                    break;
            }
        });
    }

    const syncRating = ()=> {
        axios.get(
            'http://localhost:8081/posts/getById?postId=' +props.postId, { headers: {"Authorization" : `Bearer ${token}`} }
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

        axios.post('http://localhost:8081/posts/vote?postId=' +props.postId, data,
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
        <div className="Voting">
            <button id={"upvoteButton" + props.postId} onClick={upvoteClicked}>Upvote</button>
            <div id={"rating" + props.postId}>{props.postRating}</div>
            <button id={"downvoteButton" + props.postId} onClick={downvoteClicked}>Downvote</button>
        </div>
    );
}

export default Vote;
