import React from "react";
import PostsIndexComponent from "../components/posts/PostsIndexComponent";

const PostsView: React.FC = () => {
    return (
        <div>
            <header className="App-header">
                <div><PostsIndexComponent/></div>
            </header>
        </div>
    )
}
export default PostsView
