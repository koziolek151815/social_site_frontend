import ScrollablePostView from "../ScrollablePostView/ScrollablePostView";
import { withRouter } from "react-router";

function SearchPage(props) {
    return (
        <div className="App">
            <h2> {"Results for: " + props.match.params.searchText}  </h2>
            <ScrollablePostView endpoint={"posts/search/" + props.match.params.searchText} sort="votes,DESC"></ScrollablePostView>
        </div>
    );
}

export default withRouter(SearchPage);