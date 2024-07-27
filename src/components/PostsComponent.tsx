import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState, AppDispatch} from "../store/index.module";
import {fetchData, Post} from "../features/postsSlice";
import PostComponent from "./PostComponent";

const DataList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const posts: Post[] = useSelector((state: RootState) => state.data.posts)
    // const posts = [{title: 'lvnsnjfd', body: 'ajsdbvcbsajsdbvcbsajsdbvcbsajsdbvcbsajsdbvcbsajsdbvcbsajsdbvcbsajsdbvcbs ', userId: 23, Id: 0}]
    const status = useSelector((state: RootState) => state.data.status)
    const error = useSelector((state: RootState) => state.data.error)
    useEffect(() => {
        if (status === 'idle')
            dispatch(fetchData())
    }, [status, dispatch]);
    let content;
    if (status === 'loading') {
        content = <div>Loading...</div>;
    } else if (status === 'succeeded') {
        content = (
            <ul>
                {
                    posts && posts.length > 0 ? (
                        posts.map(post =>
                            <li key={post.Id}><PostComponent item={post}/></li>
                        )
                    ) : (
                        <li>No Post!</li>
                    )}
            </ul>
            // <ul>{posts && posts.length > 0 ? posts.map((i : Post) => <li>{i?.title}</li>  ) : <li>ay</li>}</ul>
        );
    } else if (status === 'failed') {
        content = <div>{error}</div>;
    }
    return (
        <div>
            <h2>posts</h2>
            <div>status</div>
            <section>{content}</section>
        </div>
    )
}

export default DataList
