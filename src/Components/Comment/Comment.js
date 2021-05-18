import React, {useEffect, useState} from "react";
import axios, * as others from 'axios';
import {Link} from "react-router-dom";
import './Comment.css';
import Vote from "../Vote/Vote";

function Comment(props) {
    function formatDate(dateParam){
        const date = new Date(dateParam);
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth()+1)).slice(-2);
        const year = date.getFullYear();
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);
        return day +'.' + month +'.' + year + ' ' + hours +':' + minutes;
    }

    return (
        <div className="Comment">
            <p> Title: {props.comment.title}</p>
            <br/>
            <p> Content: {props.comment.description}</p>
            <br/>
            <p> Time: {formatDate(props.comment.postCreatedDate)}</p>
            <br/>
            <p> Author: {props.comment.postAuthor.username}</p>
            <br/>
            <Vote postRating={props.comment.rating} postId={props.comment.postId} />
        </div>
    );
}

export default Comment;
