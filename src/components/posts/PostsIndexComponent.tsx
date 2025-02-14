import React, {useEffect} from "react";
import PostComponent from "./PostComponent";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/index.module";
import {fetchPosts, fetchUsersPosts} from "../../features/postsSlice";
import Pagination from "../ui/Pagination";
import {useNavigate} from "react-router-dom";
interface PostsIndexProps{
    userId?: string
}
const PostsIndexComponent: React.FC<PostsIndexProps> = ({userId}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const {posts, loading, error, postsResponse} = useSelector((state: RootState) => state.post)
    const handleFetchPost = async (page: number, limit: number, userId?: string) => {
        try {
            const response = userId
                ? await dispatch(fetchUsersPosts({ page, limit, userId })).unwrap()
                : await dispatch(fetchPosts({ page, limit })).unwrap();

            if (response?.status === 401) {
                localStorage.removeItem("userID");
                localStorage.removeItem("token");
                navigate("/auth");
            }
        } catch (err) {
            console.error("Error fetching posts:", err);
        }
    };

    useEffect(() => {
        if (!loading && posts.length === 0) {
            handleFetchPost(1, 5, userId);
        }
    }, []);
    const changePage = (page: number) => {
        handleFetchPost(page, 5, userId);
    };
    if (loading) return <h3>Loading...</h3>;
    if (error) return <h3 className="text-red-800">error: {error}</h3>;

    return (
        <div className="container mx-auto px-4 pb-8 w-full h-full ">
            {posts?.length > 0 ? (
                <ul className="grid grid-cols-1 gap-4 w-full">
                    {posts.map((post) => (
                        <li key={post._id}>
                            <PostComponent post={post} userId={userId} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No posts found yet.

                </p>
            )}
            {posts?.length > 0 && postsResponse?.meta.total_pages > 0 &&
                (<Pagination currentPage={postsResponse?.meta?.current_page || 0} totalPages={postsResponse?.meta?.total_pages || 0} onPageChange={(page) => {changePage(page)}}/>)
            }


        </div>
    );
}
export default PostsIndexComponent
