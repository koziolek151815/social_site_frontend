import React, {useEffect, useState} from "react";
import axios, * as others from 'axios';
import './ExpandableImage.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


function ExpandableImage(props) {

    const token = localStorage.getItem('token');
    const [imageData, setImageData] = useState(null);
    const [imageExpanded, setImageExpanded] = useState(false);
    const imageReference = React.createRef();

    const imageClicked = ()=>{
        setImageExpanded(!imageExpanded);
    }


    useEffect(async () => {
        const response = await axios.get(props.endpoint, {headers: {"Authorization": `Bearer ${token}`}});
        setImageData(response.data);
    }, []);



    if(imageData==null)return null;

    return  (<img className={imageExpanded?"expandableImageBig":"expandableImageSmall"} ref={imageReference}
                  alt="post img" src={"data:image/jpeg;base64,"+imageData} onClick={imageClicked}/>);
}

export default ExpandableImage;
