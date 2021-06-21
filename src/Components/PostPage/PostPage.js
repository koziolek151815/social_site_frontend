import React from "react";
import axios from 'axios';
import Comment from "../Comment/Comment";
import AddPost from "../AddPost/AddPost";
import { withRouter } from "react-router";

import Post from "../Post/Post";


class PostPage extends React.Component {
    state = {
        post: null,
        comments: [],
        replyVisible: false
    }

    constructor(props) {
        super(props);

        this.token = localStorage.getItem('token');
    }

    async loadComments(postId)
    {
        const responseComments = await axios.get(
            process.env.REACT_APP_BACKEND_URL + '/posts/getPostReplies?postId=' + postId + "&sort=postCreatedDate,ASC", {headers: {"Authorization": `Bearer ${this.token}`}});
        this.setState({
            comments: responseComments.data.content
        })
    }

    async componentDidMount() {
        const config = {headers: {"Authorization": `Bearer ${this.token}`}}

        await axios.get(process.env.REACT_APP_BACKEND_URL + '/posts/getById?postId=' + this.props.match.params.id, config)
            .then(async (response)=>{
                const post = response.data;

                if(post.parentPost==null)
                {
                    this.setState({post: post})
                    await this.loadComments(post.postId);
                }
                else //This is a comment
                {
                    const parentPostId = post.parentPost.postId;
                    //Change the url to parent post
                    window.history.replaceState(null, '', "/posts/" + parentPostId);
                    //Load parent post
                    axios.get(process.env.REACT_APP_BACKEND_URL + '/posts/getById?postId=' + parentPostId, config)
                        .then(async (response)=>{
                            this.setState({post: response.data})
                            await this.loadComments(parentPostId);
                        })
                }
        });

    }

    render() {
        return (
            <div className="PostPage">
                {this.state.post != null ? <Post post={this.state.post}/> : ("Loading...")}

                <h1>Replies:</h1>
                {this.state.comments.map((comment, id) =>
                    <Comment comment={comment} key={id}/>
                )}


                {
                    this.state.replyVisible&&this.state.post != null?
                        (
                            <h2>Write new reply</h2>,
                                <AddPost parentPostId={this.state.post.postId} showError={this.props.showError}
                                         showLink={false}/>
                        ) :
                        (<button className="btn btn-default text-white bg-dark" onClick={() => {
                            this.setState({replyVisible: true});
                        }}>Write new reply</button>)
                }
            </div>
        );
    };
}

export default withRouter(PostPage);
