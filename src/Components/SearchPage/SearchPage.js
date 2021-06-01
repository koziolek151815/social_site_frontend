import ScrollablePostView from "../ScrollablePostView/ScrollablePostView";
import { withRouter } from "react-router";

function SearchPage(props) {
    return (
        <div className="App">
            {
                typeof props.match.params.searchText !== 'undefined'?
                    (<>
                        <h2> {"Results for: " + props.match.params.searchText}  </h2>
                        <ScrollablePostView endpoint={"posts/search/" + props.match.params.searchText} sort="votes,DESC"></ScrollablePostView>
                    </>):
                    (<h2> {"Empty search query!"}  </h2>)
            }
        </div>
    );
}

export default withRouter(SearchPage);