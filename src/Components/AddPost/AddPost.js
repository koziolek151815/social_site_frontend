import React from "react";
import axios from "axios";
import './AddPost.css';

import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
    comma: 188,
    enter: 13,
    space: 32
};

const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.space];

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

        this.maxTags = 10;
        this.minTitleLength = 4;
        this.minDescriptionLength = 5;
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
            link = process.env.REACT_APP_BACKEND_URL + '/posts?parentPostId=' + this.props.parentPostId;
        else
            link = process.env.REACT_APP_BACKEND_URL + '/posts';



        axios.post(link, formData,
            { headers: {"Authorization" : `Bearer ${this.token}`} })
            .then((response) => {
                if(this.isComment())
                    window.location.replace('/posts/' + this.props.parentPostId);
                else
                    window.location.replace('/posts/' + response.data.postId);
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

        if(this.state.title.length < this.minTitleLength  ){
            this.props.showError('Title is too short!');
            error = true;
        }
        else if(this.state.description.length < this.minDescriptionLength ){
            this.props.showError('Description is too short!');
            error = true;
        }
        if (!error){
            this.sendPostCreationRequest();
        }
    };


    fileInputChangeHandler = (event) => {
        const [file] = this.fileInput.current.files
        if (file) {
            this.setState(state => ({selectedFile: event.target.files[0]}))
            this.photoPreview.current.src = URL.createObjectURL(file)
        }
    };

    handleDelete(i) {
        this.setState({
            tags: this.state.tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {

        if(this.state.tags.length<this.maxTags)
        {
            const tagAlreadyExists = this.state.tags.some(t=>t.text === tag.text);

            if(!tagAlreadyExists)
            {
                this.setState(state => ({ tags: [...state.tags, tag] }));
            }
            else this.props.showError(`Duplicate tag! "${tag.text}" already added.`);
        }
        else this.props.showError(`Too many tags! (Maximum is ${this.maxTags})`);
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
            <div className="Post container my-2 border rounded">
                <div className="col-md-12 py-2 blogShort">
                    <h1>{this.isComment()?('Write new reply'):('Write new post')}</h1>

                    <form autocomplete="off">
                        <img ref={this.photoPreview} id="photoPreview" src="#" alt=""/>
                        <textarea id={"title"} value={this.title} placeholder={"Title"} onChange={this.handleTitleChange}/>

                        {
                            this.isComment()?(null):
                            (
                                <ReactTags tags={this.state.tags}
                                           suggestions={this.state.suggestions}
                                           placeholder={"Add some tags"}
                                           handleDelete={this.handleDelete.bind(this)}
                                           handleAddition={this.handleAddition.bind(this)}
                                           handleDrag={this.handleDrag.bind(this)}
                                           delimiters={delimiters}
                                           allowUnique={false}
                                            id="tags"/>
                            )
                        }

                        <textarea id={"description"} value={this.description} placeholder={"Write something"}
                                  onChange={this.handleDescriptionChange}/>

                        <span className="custom-file w-50 ">
                            <input className="custom-file-input" ref={this.fileInput} id="fileInput" accept="image/*" type="file" name="file"
                                   onChange={this.fileInputChangeHandler}/>
                            <label className="custom-file-label"  htmlFor="customFile">{this.state.selectedFile!==null?(this.state.selectedFile.name):("Choose file")}</label>
                        </span>

                        <button className={"btn btn-default text-white bg-dark float-right"} id="addPostButton" onClick={this.addPost}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddPost;
