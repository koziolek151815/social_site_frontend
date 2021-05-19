import ScrollablePostView from "../ScrollablePostView/ScrollablePostView";

function MainPage() {
    return (
        <div className="App">
            <h2> Posts </h2>
            <ScrollablePostView endpoint="getFrontPage" sort="id,DESC"></ScrollablePostView>
        </div>
    );
}

export default MainPage;
