
import React, {useEffect, useState} from "react";
import axios, * as others from 'axios';
import Comment from "../Comment/Comment";
import AddPost from "../AddPost/AddPost";
import { withRouter } from "react-router";

import Post from "../Post/Post";


function PostPage(props) {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [replyVisible, setReplyVisible] = useState(false);

    const token = localStorage.getItem('token');
    useEffect(async () => {
        const response = await axios.get(
            process.env.REACT_APP_BACKEND_URL + '/posts/getById?postId=' +props.match.params.id, { headers: {"Authorization" : `Bearer ${token}`} }
        );
        const responseComments = await axios.get(
            process.env.REACT_APP_BACKEND_URL + '/posts/getPostReplies?postId=' +props.match.params.id + "&sort=postCreatedDate,ASC", { headers: {"Authorization" : `Bearer ${token}`} }
        );
        setPost(response.data);
        setComments(responseComments.data.content);
    }, []);



    return (
        <div className="PostPage">
            {post!=null?<Post post={post}/>:("Loading...")}

            <h1>Replies:</h1>
            {comments.map(comment =>
                <Comment comment = {comment} key={comment.id} />
            )}


            {
                replyVisible?
                    (
                        <h2>Write new reply</h2>,
                        <AddPost parentPostId = {props.match.params.id} showError={props.showError} showLink={false} />
                    ):
                    (<button className="btn btn-default bg-info" onClick={()=>{setReplyVisible(true)}}>Write new reply</button>)
            }
        </div>
    );
}

export default withRouter(PostPage);
