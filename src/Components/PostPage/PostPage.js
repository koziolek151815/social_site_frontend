
import React, {useEffect, useState} from "react";
import axios, * as others from 'axios';
import {Link} from "react-router-dom";
import './PostPage.css';
import Comment from "../Comment/Comment";

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
            'http://localhost:8081/posts/getPostReplies?postId=' +props.match.params.id, { headers: {"Authorization" : `Bearer ${token}`} }
        );
        setComments(responseComments.data.content);
        console.log(response.data.postAuthor);
        setPost(response.data);
        setUsername(response.data.postAuthor.username);
    }, []);

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
            </div>
            {comments.map(comment =>
                <Comment comment = {comment} key={comment.id} />
            )}
        </div>
    );
}

export default PostPage;
