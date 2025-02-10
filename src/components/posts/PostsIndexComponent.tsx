import React, {useEffect} from "react";
import PostComponent from "./PostComponent";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/index.module";
import {fetchPosts} from "../../features/postsSlice";
import Pagination from "../ui/Pagination";
import {useNavigate} from "react-router-dom";
interface PostsIndexProps{
    userId?: string
}
const PostsIndexComponent: React.FC<PostsIndexProps> = ({userId}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const {posts, loading, error, postsResponse} = useSelector((state: RootState) => state.post)
    const fetchPost = (page: number, limit: number, userId?: string) => {
        dispatch(fetchPosts({page, limit, userId})).then((res: any) => {
        })
    }
    useEffect(() => {
        if (!loading) {
            if (!userId) {
                fetchPost(1, 5)
            }
            else fetchPost(1, 5, userId)
        }
    }, [dispatch]);
    const changePage = async (page: number) => {
        try {
            if (!userId)
                 fetchPost(page, 5)
            else fetchPost(page, 5, userId)
        }
        catch (err){
        }
    }
    if (loading) return <h3>Loading...</h3>;
    if (error) return <h3 className="text-red-800">error: {error}</h3>;

    return (
        <div className="container mx-auto px-4 pb-8 w-full h-full ">
            {posts?.length > 0 ? (
                <ul className="grid grid-cols-1 gap-4 w-full">
                    {posts.map((post) => (
                        <li key={post._id}>
                            <PostComponent post={post} />
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
