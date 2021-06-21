import ScrollablePostView from "../ScrollablePostView/ScrollablePostView";

function MainPage() {
    return (
        <div className="MainPage">
            <ScrollablePostView endpoint="posts/getFrontPage" sort="id,DESC"></ScrollablePostView>
        </div>
    );
}

export default MainPage;
