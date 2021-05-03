
import React, {useEffect, useState} from "react";
import axios, * as others from 'axios';
import {Link} from "react-router-dom";
import './PostPage.css';

function PostPage(props) {
    const [post, setPost] = useState([]);
    const [username, setUsername] = useState('');
    const token = localStorage.getItem('token');
    useEffect(async () => {
        const response = await axios.get(
            'http://localhost:8081/posts/getById?postId=' +props.match.params.id, { headers: {"Authorization" : `Bearer ${token}`} }
        );
        console.log(response.data.postAuthor);
        setPost(response.data);
        setUsername(response.data.postAuthor.username);
    }, []);

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
        </div>
    );
}

export default PostPage;
