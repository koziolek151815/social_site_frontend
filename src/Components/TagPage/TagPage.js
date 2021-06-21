import ScrollablePostView from "../ScrollablePostView/ScrollablePostView";
import { withRouter } from "react-router";

function TagPage(props) {
    return (
        <div className="App">
            {
                typeof props.match.params.tagName !== 'undefined' ?
                    (<>
                        <h2> {"Tag: " + props.match.params.tagName}  </h2>
                        <ScrollablePostView endpoint={"tags/getTagPage/" + props.match.params.tagName} sort="id,DESC&votes,DESC"></ScrollablePostView>
                    </>) :
                    (<h2> {"Empty tag!"}  </h2>)
            }
        </div>
    );
}

export default withRouter(TagPage);