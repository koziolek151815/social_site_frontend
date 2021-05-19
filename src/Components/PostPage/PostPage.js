
import React, {useEffect, useState} from "react";
import axios, * as others from 'axios';
import './PostPage.css';
import Comment from "../Comment/Comment";
import AddComment from "../AddComment/AddComment";
import Vote from "../Vote/Vote";
import { withRouter } from "react-router";

import {formatDate} from "../../Utility/Date";

function PostPage(props) {
    const [post, setPost] = useState([]);
    const [username, setUsername] = useState('');
    const [comments, setComments] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(async () => {
        const response = await axios.get(
            'http://localhost:8081/posts/getById?postId=' +props.match.params.id, { headers: {"Authorization" : `Bearer ${token}`} }
        );
        const responseComments = await axios(
            'http://localhost:8081/posts/getPostReplies?postId=' +props.match.params.id + "&sort=postCreatedDate,ASC", { headers: {"Authorization" : `Bearer ${token}`} }
        );
        setComments(responseComments.data.content);
        console.log(response.data.postAuthor);
        setPost(response.data);
        setUsername(response.data.postAuthor.username);
    }, []);

    return (
        <div className="PostPage">
            <div>
                <p> Title: {post.title}</p>
                <br/>
                <p> Content: {post.description}</p>
                <br/>
                <p> Time: {formatDate(post.postCreatedDate)}</p>
                <br/>
                <p> Author: {username}</p>
                <br/>
                <Vote postRating={post.rating} postId={post.postId} />
            </div>
            {comments.map(comment =>
                <Comment comment = {comment} key={comment.id} />
            )}
            <AddComment parentPostId = {props.match.params.id} showError={props.showError} />
        </div>
    );
}

export default withRouter(PostPage);
