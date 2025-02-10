import React, {useEffect} from "react";
import FormCard from "../components/posts/FormCard";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/index.module";
import {getPost} from "../features/postsSlice";
const UpdatePostView:React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>()
    const {post, loading} =  useSelector((state: RootState) => state.post)
    useEffect(() => {
        if(id)
        dispatch(getPost(id))
    }, [id]);
    return(
        <FormCard initialData={post} loading={loading}/>
    )
}

export default UpdatePostView;
