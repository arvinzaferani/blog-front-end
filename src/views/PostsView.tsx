import React from "react";
import PostsIndexComponent from "../components/posts/PostsIndexComponent";

const PostsView: React.FC = () => {
    return (
        <div className=" w-full pt-[100px] flex flex-col justify-start items-center">
            <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">EXPLORE RECENT POSTS</h1>

            <PostsIndexComponent/>
        </div>
    )
}
export default PostsView
