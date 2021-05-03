import React, {useEffect, useState} from "react";
import axios from "axios";
import Post from "../Post/Post";

function MainPage() {
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(async () => {
        const response = await axios.get(
            'http://localhost:8081/posts/getAll', { headers: {"Authorization" : `Bearer ${token}`} }
        );
        console.log(response.data);
        setPosts(response.data);
    }, []);

    return (
        <div className="App">
            <h2> Posts </h2>
            {posts.map(post =>
                <Post post = {post} key={post.postId}  />
            )}
        </div>
    );
}

export default MainPage;
