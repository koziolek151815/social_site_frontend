//Images have unique id's so they can be stored in localstorage and downloaded only once
//Currently I made it use postid

import axios from "axios";

export async function getCachedImageData(postId) {
    const key = "image/" + postId;

    const fromStorage = localStorage.getItem(key);

    //Image found in the storage
    if(fromStorage!==null)return fromStorage;

    //Image not found get it from backend
    const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/posts/getPhoto?postId=' + postId,
        {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
    const responseData = response.data;

    localStorage.setItem(key, responseData);
    return responseData;
}