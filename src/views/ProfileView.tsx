import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/index.module";
import {getCurrentUser, User} from "../features/usersSlice";
import PostsIndexComponent from "../components/posts/PostsIndexComponent";
import {useNavigate} from "react-router-dom";
import LoadingUi from "../components/ui/LoadingUi";
import {AuthComponent} from "../components/auth/AuthComponent";

const ProfileView: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const {currentUser, loading, error} = useSelector((state: RootState) => state.user)
    const dispatchGetCurrentUser =async () => {
        const response = await dispatch(getCurrentUser())
        if (response.payload?.status === 401) {
            await localStorage.removeItem("token")
            navigate('/auth')
        }
    }
    useEffect(() => {
        if (!loading) {
            if (!currentUser) {
                dispatchGetCurrentUser()
            }
        }
    }, [dispatch]);

    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (loading) return <LoadingUi/>
    return (
        <div className=" w-full px-4 flex flex-col justify-between h-screen pt-[100px]">
            <h2 className="text-3xl font-bold mb-6 mt-4 text-black dark:text-white">PROFILE PAGE</h2>
            <div className="flex flex-row justify-between items-start">
                <div className="flex flex-col justify-start items-start">
                    <h3 className="ms-6 text-xl font-bold mb-6 mt-4 text-black dark:text-white">PROFILE DATA</h3>
                    {currentUser && (
                        <AuthComponent usage='Profile' currentUser={currentUser}/>
                    )}
                </div>
                <div className="  flex-1 flex flex-col justify-start items-start">
                    <h2 className="ms-6 text-xl font-bold mb-6 mt-4 text-black dark:text-white">YOUR POSTS</h2>
                    {currentUser?._id &&
                        <PostsIndexComponent userId="1"/>
                    }
                </div>
            </div>
        </div>
    );
}
export default ProfileView
