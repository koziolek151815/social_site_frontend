import React, {useEffect, useState} from "react";
import axios from "axios";
import './AddPost.css';

function AddPost() {
    const fileInput = React.createRef();
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

    const submitPhoto = () => {
        const formData = new FormData();
        formData.append("file", selectedFile);

        axios.post('http://localhost:8081/uploadPostPhoto', formData, { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
                alert("File Upload success");
            })

            .catch((err) => alert("File Upload Error"));
    };

    const sendPost = () => {
        axios.post('http://localhost:8081/posts', {
            description: description,
            title: title

        },{ headers: {"Authorization" : `Bearer ${token}`} })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
        setDescription('');
        setTitle('');

    };


    return (
        <div className="AddPost">
            <div>
                <p>Add title:</p>
                <textarea id= {"title"} value={title} placeholder={"Add title"} onChange={handleTitleChange} />
            </div>
            <div>
            <div>
                <p>Add content:</p>
                <textarea id= {"description"} value={description} placeholder={"Add something interesting"} onChange={handleDescriptionChange} />
            </div>
            </div>
            <input type="button" value="Add" onClick={sendPost} />

            <div>
                <input type="file" name="file" onChange={changeHandler} />
                <div>
                    <button onClick={submitPhoto}>Submit</button>
                </div>
            </div>

        </div>
    );
}

export default AddPost;
