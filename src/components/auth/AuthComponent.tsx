import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/index.module";
import {useNavigate} from "react-router-dom";
import {login, register, logout, User, updateCurrentUser} from "../../features/usersSlice";
import FileDropzone from "../ui/DropZone";
import {AlertError} from "../../features/alertSlice";

interface AuthComponentProps {
    usage: 'Auth' | 'Profile',
    currentUser?: Partial<User> | null,
}

export const AuthComponent: React.FC<AuthComponentProps> = ({usage, currentUser}) => {
    const [credential, setCredential] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [email, setEmail] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [profile_image_url, setProfileImageUrl] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>()
    const userState = useSelector((state: RootState) => state.user)
    const resetForm = () => {
        setUsername('')
        setPassword('')
        setRepeatPassword('')
        setEmail('')
        setFirstName('')
        setLastName('')
        setPhoneNumber('')
        setProfileImageUrl('')
    }
    const handleFileUpload = (url: string | null) => {
        if (url)
            setProfileImageUrl(url);
    };
    const navigate = useNavigate();
    const handleAction = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (variant === 'Login' && usage === 'Auth') {
                await dispatch(login({credential, password})).unwrap()
                resetForm()
                console.log('login')
                navigate(`/posts`);
            } else if (variant === 'Register' && usage === 'Auth') {
                if (password !== repeatPassword) {
                    AlertError({title: '', text: 'Your Password and Repeat Password fields doesnt match!'})
                    return
                }
                await dispatch(register({
                    username,
                    password,
                    email,
                    first_name,
                    last_name,
                    phone_number,
                    profile_image_url,
                })).unwrap()
                resetForm()
                navigate(`/posts`);
            } else if(usage === 'Profile'){
                if (password !== repeatPassword) {
                    AlertError({title: '', text: 'Your Password and Repeat Password fields doesnt match!'})
                    return
                }
                await dispatch(updateCurrentUser({
                    username,
                    password,
                    email,
                    first_name,
                    last_name,
                    phone_number,
                    profile_image_url,
                })).unwrap()
            }
        } catch (_){}
    }
    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem('token')
        localStorage.removeItem('userID')
    }
    const [variant, setVariant] = useState<'Login' | 'Register'>('Login')
    const variantSelectedClass = 'cursor-pointer text-black dark:text-white border-b dark:border-b-white border-b-black w-[50%] flex flex-row justify-center py-2 duration-300'
    const variantDeselectedClass = 'cursor-pointer text-gray-800 dark:text-gray-500 border-b dark:border-b-gray-500 border-b-gray-300 w-[50%] flex flex-row justify-center py-2 duration-300'
    useEffect(() => {
        setUsername(currentUser?.username ?? '')
        setPassword('')
        setRepeatPassword('')
        setEmail(currentUser?.email ?? '')
        setFirstName(currentUser?.first_name ?? '')
        setLastName(currentUser?.last_name ?? '')
        setPhoneNumber(currentUser?.phone_number ?? '')
        setProfileImageUrl(currentUser?.profile_image_url ?? '')
    }, [currentUser]);
    return (
        <div className=" flex flex-col items-center justify-center pb-6 px-6 border-b-white">
            {userState.token && usage === 'Auth' ? (
                <div
                    className="bg-white dark:bg-black shadow-md rounded border min-w-[300px] shadow-white p-6 text-center max-w-md w-full">
                    <h3 className="text-xl text-black dark:text-white mb-4 flex flex-col justify-center items-center">
                        <span>Welcome! </span>
                        <span className='text-gray-400 text-lg'>You are logged in.</span>
                    </h3>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 bg-white dark:bg-black text-black dark:text-white border rounded hover:bg-white hover:text-black duration-300"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <form onSubmit={handleAction}
                    className="bg-white dark:bg-black border shadow-md shadow-gray-400 rounded p-6 max-w-md flex flex-col justify-start items-center w-full gap-6">
                    {usage === 'Auth' &&
                        <div className="w-full flex flex-row justify-center">
                            <div className={variant === "Login" ? variantSelectedClass : variantDeselectedClass}
                                 onClick={() => setVariant('Login')}>
                                Login
                            </div>
                            <div className={variant === "Register" ? variantSelectedClass : variantDeselectedClass}
                                 onClick={() => setVariant('Register')}>
                                Register
                            </div>
                        </div>
                    }
                    <div className="space-y-4">
                        {(variant === 'Register' || usage === 'Profile') &&
                            <input
                                type="text"
                                placeholder="First Name"
                                value={first_name}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full bg-white dark:bg-black text-black dark:text-white px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        }
                        {(variant === 'Register' || usage === 'Profile') &&
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={last_name}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full bg-white dark:bg-black text-black dark:text-white px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        }
                        {(variant === 'Register' || usage === 'Profile') &&
                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={phone_number}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full bg-white dark:bg-black text-black dark:text-white px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        }
                        {(variant === 'Register' || usage === 'Profile') &&
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                required={variant === 'Register'}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-white dark:bg-black text-black dark:text-white px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />}
                        {(variant === 'Login' && usage === 'Auth') &&
                            <input
                                type="text"
                                placeholder="Username, Email, or Phone Number"
                                required={variant === 'Login' && usage === 'Auth'}
                                value={credential}
                                onChange={(e) => setCredential(e.target.value)}
                                className="w-full bg-white dark:bg-black text-black dark:text-white px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />}

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            required={usage !== 'Profile'}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white dark:bg-black text-black dark:text-white px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {(variant === 'Register' || usage === 'Profile') &&
                            <input
                                type="password"
                                placeholder="Repeat Password"
                                value={repeatPassword}
                                required={variant === 'Register'}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                className="w-full bg-white dark:bg-black text-black dark:text-white px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        }
                        {(variant === 'Register' || usage === 'Profile') &&
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                required={variant === 'Register'}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white dark:bg-black text-black dark:text-white px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />}
                        {(variant === 'Register' || usage === 'Profile') &&
                            <FileDropzone onFileUploadUrl={handleFileUpload} storedFileUrl={profile_image_url}
                                          placeholder={'Drop or select your Profile image here.'}/>

                        }
                    </div>
                    <div className="flex justify-between mt-6">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-white dark:bg-black text-black dark:text-white border rounded hover:bg-white hover:text-black duration-300"
                        >
                            {variant === 'Login' && usage === 'Auth' && 'Login'}
                            {variant === 'Register' && usage === 'Auth' && 'Register'}
                            {usage === 'Profile' && 'Updated'}
                        </button>

                    </div>

                </form>
            )}
        </div>
    );

}
