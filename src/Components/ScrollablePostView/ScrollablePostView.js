import React, {useEffect, useState} from "react";
import axios from "axios";
import Post from "../Post/Post";
import InfiniteScroll from "react-infinite-scroll-component";


class ScrollablePostView extends React.Component {
    state = {
        items: [],
        hasMore: true,
        currentPage: 0
    };

    constructor(props) {
        super(props);

        this.fetchMoreData();
    }

    getDataFromApi = async (page)=>{
        return await axios.get(
            `http://localhost:8081/${this.props.endpoint}?page=${page}&size=5&sort=${this.props.sort}`,
            { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} }
        );
    }

    fetchMoreData = () => {
        console.log("Trying to get more data!");
        this.getDataFromApi(this.state.currentPage).then((result)=>{
            console.log(result)
            this.setState({
                hasMore: !result.data.empty,
                items: this.state.items.concat(result.data.content),
                currentPage: this.state.currentPage+1
            });
        })
    };

    render() {
        return (
            <div>
                <InfiniteScroll
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {this.state.items.map((post, index) => (
                        <Post post={post} key={index}  />
                    ))}
                </InfiniteScroll>
            </div>
        );
    }
}

export default ScrollablePostView;