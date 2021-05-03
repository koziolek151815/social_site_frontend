
import React, {useEffect, useState} from "react";
import axios, * as others from 'axios';
import {Link} from "react-router-dom";
import './Post.css';

function Post(props) {
    function formatDate(dateParam){
        const date = new Date(dateParam);
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + date.getMonth()).slice(-2);
        const year = date.getFullYear();
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);
        return day +'.' + month +'.' + year + ' ' + hours +':' + minutes;
    }

    return (
        <div className="Post">
                <Link  to={`/posts/${props.post.postId}`}>Link to post</Link>
                <br/>
                <p> Title: {props.post.title}</p>
                <br/>
                <p> Content: {props.post.description}</p>
                <br/>
                <p> Time: {formatDate(props.post.postCreatedDate)}</p>
                <br/>
                <p> Author: {props.post.postAuthor.username}</p>
                <br/>
        </div>
    );
}

export default Post;
