import React, {useEffect, useState} from "react";
import PostComponent from "../components/posts/PostComponent";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/index.module";
import {fetchPosts} from "../features/postsSlice";
import {getCurrentUser, User} from "../features/usersSlice";

const YourPosts: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {currentUser , loading, error} =useSelector((state: RootState) => state.user)
    useEffect(() => {
        if (!loading) {
            dispatch(getCurrentUser()).then((dta) => console.log('ss',dta))
        }
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Profile Page</h1>
            if(currentUser)
            {/* User Details */}
            {currentUser && (
                <div className="mb-8 p-4 bg-white shadow rounded-md">
                    {/*<h2 className="text-2xl font-bold">{currentUser.name}</h2>*/}
                    <p className="text-gray-600">Email: {currentUser?.email}</p>
                    <p className="text-gray-600">
                        Joined: {new Date(currentUser?.createdAt).toLocaleDateString()}
                    </p>
                </div>
            )}

            {/* User Posts */}
            {/*<h2 className="text-2xl font-bold mb-4">Your Posts</h2>*/}
            {/*{posts.length > 0 ? (*/}
            {/*    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">*/}
            {/*        {posts.map((post) => (*/}
            {/*            <li key={post._id} className="p-4 bg-white shadow rounded-md">*/}
            {/*                <h3 className="text-xl font-bold">{post.title}</h3>*/}
            {/*                <p className="text-gray-600">{post.content}</p>*/}
            {/*                <p className="text-sm text-gray-500 mt-2">*/}
            {/*                    Created: {new Date(post.createdAt).toLocaleDateString()}*/}
            {/*                </p>*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*) : (*/}
            {/*    <p className="text-gray-500">You have not created any posts yet.</p>*/}
            {/*)}*/}
        </div>
    );
}
export default YourPosts
