import React, {useEffect, useState} from "react";
import axios, * as others from 'axios';
import {Link} from "react-router-dom";
import './Comment.css';
import Vote from "../Vote/Vote";

import {formatDate} from "../../Utility/Date";

function Comment(props) {

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
