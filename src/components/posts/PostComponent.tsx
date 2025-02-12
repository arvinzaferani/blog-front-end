import React, {useEffect, useState} from "react";
import {deletePost, Post} from "../../features/postsSlice";
import Dropdown from "../ui/Dropdown";
import {ACTIOINS} from "../../types/Status";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/index.module";
import {useNavigate} from "react-router-dom";
import profileIconDark from "../../assets/icons/profile-dark.svg";
import profileIconLight from "../../assets/icons/profile-light.svg";
import {getCurrentUser} from "../../features/usersSlice";
interface PostProps {
    post: Post;
}
const PostComponent: React.FC<PostProps>= ({post}) => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const months = [
        'Jan', 'Feb', "Mar", 'Apr', 'May', 'June', 'July','Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
    const [dark, setDark] = useState<boolean>(false);
    useEffect(() => {
        const darkStorage = localStorage.getItem("dark");
        if (darkStorage === "1") {
            setDark(true);
            document.body.classList.add("dark");
        } else {
            setDark(false);
            document.body.classList.remove("dark");
        }

    }, []);
    const weekdays = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const handleDelete =  () => {
        if (post._id)
        dispatch(deletePost(post._id))
    }
    const handleUpdate =  () => {
        if (post._id)
        navigate(`/posts/update/${post._id}`);
    }

    const handleDropdown = (option: string) => {
        if (option === ACTIOINS.DELETE) handleDelete()
        if (option === ACTIOINS.UPDATE) handleUpdate()
    }

    const actionOptions = [
        {name: ACTIOINS.DELETE, color: 'red', },
        {name: ACTIOINS.UPDATE, color: 'red'}
    ]
    return (
        <div className="p-4 bg-white dark:bg-black overflow-y-scroll shadow rounded border border-gray-200 mb-4 flex flex-col justify-between items-start gap-6 w-full">
            <div className='flex flex-col w-full'>
                <div className='flex flex-row  justify-between items-center mb-4'>
                    <div className="flex flex-row justify-start items-center gap-2">
                        {post.author?.profile_image_url ?
                            <img className="w-[32px] h-[32px] rounded object-cover border border-gray-700 dark:border-gray-200" src={post.author?.profile_image_url} alt="user profile image"/>:
                            <img alt="profile icon" src={dark ? profileIconDark : profileIconLight}/>}
                        <p className="text-gray-800 dark:text-gray-200 text-wrap text-smd max-h-[300px] overflow-y-scroll pe-5 mb-0">{post.author?.username}</p>
                    </div>
                    <Dropdown ellipse options={actionOptions} onChange={handleDropdown}/>
                </div>
                <h2 className="text-xl text-black dark:text-white font-bold mb-2">{post.title}</h2>
                <p className="text-gray-800 dark:text-gray-200  mb-4 text-wrap text-sm max-h-[300px] overflow-y-scroll pe-5">{post.content}</p>
                {post.keywords ? (
                    <div className="flex flex-row justify-start items-center flex-wrap gap-1 text-sm">
                        <span className="text-gray-800 dark:text-gray-200">
                            Tags:
                        </span>
                        {post.keywords.map((str, idx) => (
                            <div key={idx}
                                 className="bg-gray-300 dark:bg-gray-700 p-1.5 w-fit rounded text-black dark:text-white">
                                {`${idx + 1}. ${str}`}
                            </div>
                        ))}
                    </div>) : ''
                }
            </div>
            <div className="flex justify-end items-center text-sm text-gray-800 dark:text-gray-300 w-full">
                { post.createdAt &&
                <div>
                    <span className='me-1'>{ weekdays[(new Date(post.createdAt)).getDay()] }</span>
                    <span className='me-1'>{ months[(new Date(post.createdAt)).getMonth()] }</span>
                    <span className='me-1'>{ (new Date(post.createdAt)).getDate() }</span>
                    <span className='me-1'>{ (new Date(post.createdAt)).getFullYear() }</span>
                    {'  '}
                    <span>
                        { `${(new Date(post.createdAt)).getHours() > 12 ? (new Date(post.createdAt)).getHours() - 12 : (new Date(post.createdAt)).getHours()}:${(new Date(post.createdAt)).getMinutes() < 10 ? 0: ''}${ (new Date(post.createdAt)).getMinutes() } ${(new Date(post.createdAt)).getHours() > 12 ? 'PM'  : 'AM'}`}</span>
                </div>
                }
            </div>
        </div>
    );
}
export default PostComponent
