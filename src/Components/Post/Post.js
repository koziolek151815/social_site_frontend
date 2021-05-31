import React, {useEffect, useState} from "react";
import axios, * as others from 'axios';
import './Post.css';
import Vote from "../Vote/Vote";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import {formatDate} from "../../Utility/Date";

function Post(props) {

    const token = localStorage.getItem('token');
    const [imageData, setImageData] = useState(null);
    const [imageExpanded, setImageExpanded] = useState(false);
    const imageReference = React.createRef();

    const imageClicked = ()=>{
        setImageExpanded(!imageExpanded);
    }


    useEffect(async () => {
        if(props.post.postPhotoName!=null) {
            const response = await axios.get(
                process.env.REACT_APP_BACKEND_URL + '/posts/getPhoto?postId=' + props.post.postId, {headers: {"Authorization": `Bearer ${token}`}}
            );

            setImageData(response.data);
        }

    }, []);


    return (
        <div className="Post container my-2 border rounded">
            <div className="col-md-12 py-2 blogShort">
                <h1>{props.post.title}</h1>
                <span className="float-left"> Author: {props.post.postAuthor.username}</span>
                <span className="float-right">{formatDate(props.post.postCreatedDate)}</span><br/>
                {
                    props.post.tags.length !== 0 ?
                    (<div id={"tags"}>{"Tags:"} {props.post.tags.map(tag => <a href={'/tags/' + tag  }>{tag + " "}</a> )}</div>) :
                    (<div id={"tags"}>{"No tags!"}</div>)
                }
                {
                    imageData==null?
                        null:
                        (<img className={imageExpanded?"postImageBig":"postImageSmall"} ref={imageReference}
                              alt="post img" src={"data:image/jpeg;base64,"+imageData} onClick={imageClicked}/>)
                }
                <article><p>
                    {props.post.description}
                </p></article>
                <Vote postRating={props.post.rating} postId={props.post.postId}/>
                {
                    props.showLink ?
                        (<a className="btn btn-default float-right bg-info" href={`/posts/${props.post.postId}`}>Reply</a>):
                        null
                }
                <br/>
            </div>
        </div>
    );
}

export default Post;
