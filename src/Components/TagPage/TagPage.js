import ScrollablePostView from "../ScrollablePostView/ScrollablePostView";
import { withRouter } from "react-router";

function TagPage(props) {
    return (
        <div className="App">
            <h2> {"Tag: " + props.match.params.tagName}  </h2>
            <ScrollablePostView endpoint={"tags/getTagPage/" + props.match.params.tagName} sort="id,DESC&votes,DESC"></ScrollablePostView>
        </div>
    );
}

export default withRouter(TagPage);