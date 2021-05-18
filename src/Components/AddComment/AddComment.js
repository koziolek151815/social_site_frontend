import React, {useEffect, useState} from "react";
import axios from "axios";

function AddComment(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const fileInput = React.createRef();
    const photoPreview = React.createRef();

    const token = localStorage.getItem('token');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };


    const sendPostCreationRequest = () => {
        const formData = new FormData();
        formData.append("postPhoto", selectedFile);
        formData.append("title", title);
        formData.append("description", description);

        axios.post('http://localhost:8081/posts?parentPostId=' + props.parentPostId, formData,
            { headers: {"Authorization" : `Bearer ${token}`} })
            .then((response) => {
                window.location.replace("/home");
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
                alert("File Upload Error");
            });

    };


    const addPost = (event) => {
        event.preventDefault();
        sendPostCreationRequest();
    };


    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);

        const [file] = fileInput.current.files
        if (file) {
            photoPreview.current.src = URL.createObjectURL(file)
        }
    };

    return (
        <div className="AddPost">

            <form>
                <div>
                    <img ref={photoPreview} id="photoPreview" src="#" alt="" />
                </div>
                <div>
                    <p>Add title:</p>
                    <textarea id= {"title"} value={title} placeholder={"Add title"} onChange={handleTitleChange} />
                </div>
                <div>
                    <p>Add content:</p>
                    <textarea id= {"description"} value={description} placeholder={"Add something interesting"} onChange={handleDescriptionChange} />
                </div>
                <div>
                    <input ref={fileInput} id="fileInput" accept="image/*"  type="file" name="file" onChange={changeHandler} />
                    <button id="addPostButton" onClick={addPost}>Submit</button>
                </div>
            </form>


        </div>
    );
}

export default AddComment;
