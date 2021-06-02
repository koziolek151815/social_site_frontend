import './Comment.css';
import Vote from "../Vote/Vote";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


import {formatDate} from "../../Utility/Date";
import ExpandableImage from "../Images/ExpandableImage";
import axios from "axios";
import React from "react";
import {getCachedImageData} from "../../Utility/Cache";

class Comment extends React.Component {
    state = {
        imageData: null
    }


    componentDidMount() {
        if(this.props.comment.postPhotoName != null) {
            getCachedImageData(this.props.comment.postId)
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
                    <h1>{this.props.comment.title}</h1>
                    <span className="float-left"> Author: {this.props.comment.postAuthor.username}</span>
                    <span className="float-right">{formatDate(this.props.comment.postCreatedDate)}</span><br/>

                    {
                        this.state.imageData != null ?
                            <ExpandableImage imageData={this.state.imageData}/> :
                            null
                    }

                    <article><p>
                        {this.props.comment.description}
                    </p></article>
                    <Vote postRating={this.props.comment.rating} postId={this.props.comment.postId}/>
                </div>
            </div>
        );
    }
}

export default Comment;
