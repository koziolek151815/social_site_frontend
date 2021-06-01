import React, {useEffect, useState} from "react";
import axios, * as others from 'axios';
import {Link} from "react-router-dom";
import './Comment.css';
import Vote from "../Vote/Vote";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


import {formatDate} from "../../Utility/Date";
import ExpandableImage from "../Image/ExpandableImage";

function Comment(props) {

    return (
            <div className="Post container my-2 border rounded">
                <div className="col-md-12 py-2 blogShort">
                    <h1>{props.comment.title}</h1>
                    <span className="float-left"> Author: {props.comment.postAuthor.username}</span>
                    <span className="float-right">{formatDate(props.comment.postCreatedDate)}</span><br/>

                    {
                        props.comment.postPhotoName!=null ?
                            <ExpandableImage endpoint = {process.env.REACT_APP_BACKEND_URL + '/posts/getPhoto?postId=' + props.comment.postId}></ExpandableImage>:
                            null
                    }

                    <article><p>
                        {props.comment.description}
                    </p></article>
                    <Vote postRating={props.comment.rating} postId={props.comment.postId} />
                </div>
            </div>
    );
}

export default Comment;
