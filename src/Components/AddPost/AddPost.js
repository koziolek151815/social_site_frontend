import React, {useEffect, useState} from "react";
import axios from "axios";
import './AddPost.css';

import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class AddPost extends React.Component {
    state = {
        title: '',
        tags: [],
        suggestions: [],
        description: '',
        selectedFile: null,
    };

    constructor(props) {
        super(props);

        this.fileInput = React.createRef();
        this.photoPreview = React.createRef();
        this.token = localStorage.getItem('token');


    }

    handleTitleChange = (event) => {
        this.setState(state => ({title: event.target.value}))
    };
    handleTagsChange = (event) => {
        this.setState(state => ({tags: event.target.value}))
    };
    handleDescriptionChange = (event) => {
        this.setState(state => ({description: event.target.value}))
    };

    sendPostCreationRequest = () => {
        const formData = new FormData();
        formData.append("title", this.state.title);
        formData.append("description", this.state.description);
        formData.append("tags", this.state.tags.map(t => t.text));

        if(this.state.selectedFile != null) {
            formData.append("postPhoto", this.state.selectedFile);
        }
        let link;
        if(this.isComment())
            link = 'http://localhost:8081/posts?parentPostId=' + this.props.parentPostId;
        else
            link = 'http://localhost:8081/posts';



        axios.post(link, formData,
            { headers: {"Authorization" : `Bearer ${this.token}`} })
            .then((response) => {
                window.location.replace("/home");
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
                alert("File Upload Error");
            });
    };


    addPost = (event) => {
        event.preventDefault();

        var error = false;

        if(this.state.title.length < 5  ){
            this.props.showError('Title is too short!');
            error = true;
        }
        else if(this.state.description.length < 5 ){
            this.props.showError('Description is too short!');
            error = true;
        }
        if (!error){
            this.sendPostCreationRequest();
        }
    };


    fileInputChangeHandler = (event) => {
        this.setState(state => ({selectedFile: event.target.files[0]}))

        const [file] = this.fileInput.current.files
        if (file) {
            this.photoPreview.current.src = URL.createObjectURL(file)
        }
    };

    handleDelete(i) {
        this.setState({
            tags: this.state.tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
        console.log(this.state.tags);
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }

    isComment()
    {
        return typeof this.props.parentPostId !== 'undefined';
    }

    render() {
        return (
            <div className="AddPost">

                <form>
                    <div>
                        <img ref={this.photoPreview} id="photoPreview" src="#" alt=""/>
                    </div>
                    <div>
                        <p>Add title:</p>
                        <textarea id={"title"} value={this.title} placeholder={"Add title"} onChange={this.handleTitleChange}/>
                    </div>
                    <div>
                        <p>Add tags:</p>
                        <ReactTags tags={this.state.tags}
                                   suggestions={this.state.suggestions}
                                   placeholder={"Add some tags"}
                                   handleDelete={this.handleDelete.bind(this)}
                                   handleAddition={this.handleAddition.bind(this)}
                                   handleDrag={this.handleDrag.bind(this)}
                                   delimiters={delimiters} />
                    </div>
                    <div>
                        <p>Add content:</p>
                        <textarea id={"description"} value={this.description} placeholder={"Add something interesting"}
                                  onChange={this.handleDescriptionChange}/>
                    </div>
                    <div>
                        <input ref={this.fileInput} id="fileInput" accept="image/*" type="file" name="file"
                               onChange={this.fileInputChangeHandler}/>
                        <button id="addPostButton" onClick={this.addPost}>Submit</button>
                    </div>
                </form>


            </div>
        );
    }
}

export default AddPost;
