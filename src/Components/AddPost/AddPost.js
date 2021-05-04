import React, {useEffect, useState} from "react";
import axios from "axios";
import './AddPost.css';

function AddPost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const token = localStorage.getItem('token');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const [selectedFile, setSelectedFile] = useState();

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };


    const sendPostPhoto = () => {
        const formData = new FormData();
        formData.append("file", selectedFile);

        axios.post('http://localhost:8081/uploadPostPhoto', formData,
            { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
                window.location.replace("/home");
            })
            .catch((err) => alert("File Upload Error"));
    };

    const sendPostData = () => {
        axios.post('http://localhost:8081/posts', {
            description: description,
            title: title
        },{ headers: {"Authorization" : `Bearer ${token}`} })
            .then((response) => {
                console.log(response);
                setDescription('');
                setTitle('');
            }, (error) => {
                console.log(error);
            });
    };

    const addPost = (event) => {
        event.preventDefault();
        sendPostData();
        sendPostPhoto();
    };


    return (
        <div className="AddPost">

            <form>
                <div>
                    <p>Add title:</p>
                    <textarea id= {"title"} value={title} placeholder={"Add title"} onChange={handleTitleChange} />
                </div>
                <div>
                    <p>Add content:</p>
                    <textarea id= {"description"} value={description} placeholder={"Add something interesting"} onChange={handleDescriptionChange} />
                </div>
                <div>
                    <input id="fileInput"  type="file" name="file" onChange={changeHandler} />
                    <button id="addPostButton" onClick={addPost}>Submit</button>
                </div>
            </form>


        </div>
    );
}

export default AddPost;
