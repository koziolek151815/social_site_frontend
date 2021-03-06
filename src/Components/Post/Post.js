import React from "react";
import './Post.css';
import Vote from "../Vote/Vote";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import {formatDate} from "../../Utility/Date";
import ExpandableImage from "../Images/ExpandableImage";
import axios from "axios";
import {getCachedImageData} from "../../Utility/Cache";

class Post extends React.Component{
    state = {
        imageData: null
    }


    componentDidMount() {
        if(this.props.post.postPhotoName != null) {
            getCachedImageData(this.props.post.postId)
                .then((imageData) => {
                    this.setState({
                        imageData: imageData
                    });
                })
        }
    }

    render() {
        return (
            <div className="Post container my-2 border rounded">
                <div className="col-md-12 py-2 blogShort">
                    <h1>{this.props.post.title}</h1>
                    <span className="float-left"> Author: <a href={'/profile/' + this.props.post.postAuthor.id}>{this.props.post.postAuthor.username}</a></span>
                    <span className="float-right">{formatDate(this.props.post.postCreatedDate)}</span><br/>
                    {
                        this.props.post.tags.length !== 0 ?
                            (<div id={"tags"}>{"Tags:"} {this.props.post.tags.map((tag, id) => <a href={'/tags/' + tag}
                                                                                             key={id}>{tag + " "}</a>)}</div>) :
                            (<div id={"tags"}>{"No tags!"}</div>)
                    }

                    {
                        this.state.imageData != null ?
                            <ExpandableImage imageData={this.state.imageData}/> :
                            null
                    }

                    <article><p>
                        {this.props.post.description}
                    </p></article>
                    <Vote postRating={this.props.post.rating} postId={this.props.post.postId}/>
                    {
                        this.props.showLink ?
                            (<a className="btn btn-default float-right text-white bg-dark"
                                href={`/posts/${this.props.post.postId}`}>Reply</a>) :
                            null
                    }
                    <br/>
                </div>
            </div>
        );
    };
}

export default Post;
