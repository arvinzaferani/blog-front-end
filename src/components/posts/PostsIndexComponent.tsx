import React, {useEffect, useState} from "react";
import PostComponent from "./PostComponent";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/index.module";
import {fetchPosts} from "../../features/postsSlice";
import Pagination from "../Pagination";

const PostsIndexComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {posts, loading, error, status, postsResponse} = useSelector((state: RootState) => state.post)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        if (!loading) {
            changePage(1).then(() => {
                setCurrentPage(postsResponse?.current_pages)
                setTotalPages(postsResponse?.total_pages)
            })
        }
    }, [dispatch]);
    const changePage = async (page: number) => {
        try {
            await dispatch(fetchPosts({page: page, limit:5}))
            setCurrentPage(postsResponse?.current_pages)
            setTotalPages(postsResponse?.total_pages)
        }
        catch (err){
            console.log(err)
        }
    }
    if (loading) return <h3>Loading...</h3>;
    if (error) return <h3 className="text-red-800">error: {error}</h3>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Recent Posts</h1>
            {posts.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {posts.map((post) => (
                        <li key={post._id}>
                            <PostComponent post={post} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No posts found yet.</p>
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => {changePage(page)}}/>

        </div>
    );
}
export default PostsIndexComponent
