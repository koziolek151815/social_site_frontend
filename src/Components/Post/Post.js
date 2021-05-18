import React, {useEffect, useState} from "react";
import axios, * as others from 'axios';
import {Link} from "react-router-dom";
import './Post.css';
import Vote from "../Vote/Vote";

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
        <div className="Post">
            <img id={"image" + props.post.postId} src="" />
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
            <Vote postRating={props.post.rating} postId={props.post.postId} />
        </div>
    );
}

export default Post;
