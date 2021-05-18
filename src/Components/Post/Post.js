import React, {useEffect, useState} from "react";
import axios, * as others from 'axios';
import {Link} from "react-router-dom";
import './Post.css';
import Vote from "../Vote/Vote";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import {formatDate} from "../../Utility/Date";

function Post(props) {

    const token = localStorage.getItem('token');
    useEffect(async () => {

        if(props.post.postPhotoName!=null) {
            const response = await axios.get(
                'http://localhost:8081/posts/getPhoto?postId=' + props.post.postId, {headers: {"Authorization": `Bearer ${token}`}}
            );
            document.getElementById("image" + props.post.postId).src = "data:image/jpeg;base64," + response.data;
        }

    }, []);

    return (
        <div className="Post container my-2 border rounded">
            <div className="col-md-12 py-2 blogShort">
                <h1>{props.post.title}</h1>
                <span className="float-left"> Author: {props.post.postAuthor.username}</span>
                <span className="float-right">{formatDate(props.post.postCreatedDate)}</span>
                <img id={"image" + props.post.postId} alt="post img" src="" className="align-content-center img-fluid thumb margin10 img-thumbnail"/>
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
