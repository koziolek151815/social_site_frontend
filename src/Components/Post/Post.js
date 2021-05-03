
import React, {useEffect, useState} from "react";
import axios, * as others from 'axios';


function Post(props) {

    return (
        <div className="Post">
            <div>
                <p> Added by: {props.post.postId}</p>
                <br/>
                <p> {props.post.description}</p>
                <br/>
                <p> {props.post.title}</p>
                <br/>
                <p> {props.post.postCreatedDate}</p>
                <br/>
                <p> {props.post.postAuthor.username}</p>
                <br/>
                <p> {props.post.postAuthor.id}</p>
                <br/>
            </div>
        </div>
    );
}

export default Post;
