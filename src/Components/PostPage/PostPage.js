
import React, {useEffect, useState} from "react";
import axios, * as others from 'axios';
import './PostPage.css';
import Comment from "../Comment/Comment";
import AddPost from "../AddPost/AddPost";
import { withRouter } from "react-router";

import Post from "../Post/Post";


function PostPage(props) {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(async () => {
        const response = await axios.get(
            'http://localhost:8081/posts/getById?postId=' +props.match.params.id, { headers: {"Authorization" : `Bearer ${token}`} }
        );
        const responseComments = await axios(
            'http://localhost:8081/posts/getPostReplies?postId=' +props.match.params.id + "&sort=postCreatedDate,ASC", { headers: {"Authorization" : `Bearer ${token}`} }
        );
        setPost(response.data);
        setComments(responseComments.data.content);
    }, []);

    return (
        <div className="PostPage">
            {post!=null?<Post post={post}/>:("Loading...")}
            {comments.map(comment =>
                <Comment comment = {comment} key={comment.id} />
            )}
            <AddPost parentPostId = {props.match.params.id} showError={props.showError} />
        </div>
    );
}

export default withRouter(PostPage);
