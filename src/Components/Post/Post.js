import React, {useEffect, useState} from "react";
import axios, * as others from 'axios';
import {Link} from "react-router-dom";
import './Post.css';
import Vote from "../Vote/Vote";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

function Post(props) {
    function formatDate(dateParam) {
        const date = new Date(dateParam);
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + date.getMonth()).slice(-2);
        const year = date.getFullYear();
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);
        return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
    }

    return (
        <div className="Post container my-2 border rounded">
            <div className="col-md-12 py-2 blogShort">
                <h1>{props.post.title}</h1>
                <span className="float-left"> Author: {props.post.postAuthor.username}</span>
                <span className="float-right">{formatDate(props.post.postCreatedDate)}</span>
                <img alt="post img" src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Big_%26_Small_Pumkins.JPG" className="align-content-center img-fluid thumb margin10 img-thumbnail"/>
                <article><p>
                    Content: {props.post.description}
                </p></article>
                <Vote postRating={props.post.rating} postId={props.post.postId}/>
                <a className="btn btn-default float-right bg-info" href={`/posts/${props.post.postId}`}>Link</a>
                <br/>
            </div>
        </div>
    );
}

export default Post;
