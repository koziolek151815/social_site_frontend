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

    async componentDidMount() {
        const config = {headers: {"Authorization": `Bearer ${this.token}`}}

        const response = await axios.get(
            process.env.REACT_APP_BACKEND_URL + '/posts/getById?postId=' + this.props.match.params.id, config);

        const responseComments = await axios.get(
            process.env.REACT_APP_BACKEND_URL + '/posts/getPostReplies?postId=' + this.props.match.params.id + "&sort=postCreatedDate,ASC", config);

        this.setState({
            post: response.data,
            comments: responseComments.data.content
        })
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
                    this.state.replyVisible ?
                        (
                            <h2>Write new reply</h2>,
                                <AddPost parentPostId={this.props.match.params.id} showError={this.props.showError}
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
