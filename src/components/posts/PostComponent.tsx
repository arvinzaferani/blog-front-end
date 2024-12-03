import React from "react";
import {Post} from "../../features/postsSlice";
interface PostProps {
    post: Post;
}
const PostComponent: React.FC<PostProps>= ({post}) => {
    return (
        <div className="p-4 bg-white shadow rounded-md border border-gray-200 mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4 text-wrap text-sm">{post.content}</p>

            {post.keywords ? (
                <div className="flex flex-row flex-wrap gap-1 text-sm">
                    {post.keywords.map((str, idx) => (
                        <div key={idx} className="bg-blue-300 p-1.5 w-fit rounded-md text-white">
                            {`${idx + 1}. ${str}`}
                        </div>
                    ))}
                </div>) : ''
            }
            <div className="flex justify-between items-center text-sm text-gray-500">
                <span>By: {post.author?.username}</span>
                <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}</span>
            </div>

        </div>
    );
}
export default PostComponent
