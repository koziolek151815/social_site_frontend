import React, {useEffect, useState} from "react";
import './ExpandableImage.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


function ExpandableImage(props) {

    const [imageExpanded, setImageExpanded] = useState(false);
    const imageReference = React.createRef();

    const imageClicked = ()=>{
        setImageExpanded(!imageExpanded);
    }

    return  (<img className={imageExpanded?"expandableImageBig":"expandableImageSmall"} ref={imageReference}
                  alt="post img" src={"data:image/jpeg;base64,"+props.imageData} onClick={imageClicked}/>);
}

export default ExpandableImage;
