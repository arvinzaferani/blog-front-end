import React, { useEffect, useState } from "react";
import profileIconLight from '../../assets/icons/profile-light.svg'
import profileIconDark from '../../assets/icons/profile-dark.svg'
import sun_icon from '../../assets/icons/sun.svg'
import moon_icon from '../../assets/icons/moon.svg'
import logoutDark from '../../assets/icons/Logout-dark.svg'
import logoutLight from '../../assets/icons/Logout-light.svg'
import {useSelector} from "react-redux";
import {RootState} from "../../store/index.module";
import {useAppDispatch} from "../../types/hooks";
import {getCurrentUser} from "../../features/usersSlice";


const Header: React.FC = () => {
    const [dark, setDark] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const {currentUser} = useSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userID')
        setIsLoggedIn(false)
    }
    useEffect(() => {
        const darkStorage = localStorage.getItem("dark");
        if (darkStorage === "1") {
            setDark(true);
            document.body.classList.add("dark");
        } else {
            setDark(false);
            document.body.classList.remove("dark");
        }
        if(!currentUser) {
            dispatch(getCurrentUser())
        }
        const checkAuthStatus = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
        };

        checkAuthStatus();
        window.addEventListener("authChange", checkAuthStatus);

        return () => {
            window.removeEventListener("authChange", checkAuthStatus);
        };

    }, []);

    const darkModeHandler = () => {
        setDark((prev) => {
            const newDark = !prev;
            if (newDark) {
                document.body.classList.add("dark");
                localStorage.setItem("dark", "1");
            } else {
                document.body.classList.remove("dark");
                localStorage.setItem("dark", "0");
            }
            return newDark;
        });
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-gray-200 dark:bg-gray-900 text-black dark:text-white shadow-md z-50">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">

                {
                    isLoggedIn ?
                        <a href={"/profile"} className="text-black dark:text-white hover:text-gray-300 transition flex flex-row justify-start items-center gap-3">
                            {
                                currentUser?.profile_image_url ?
                                    <img className="w-[32px] h-[32px] rounded object-cover border border-gray-700 dark:border-gray-200"
                                         src={currentUser?.profile_image_url} alt="user profile image"/> :
                                    <img alt="profile icon" src={dark ? profileIconDark : profileIconLight}/>
                            }
                            {
                                `Hello ${currentUser?.username}!`
                            }
                        </a> :
                        <h1 className="text-2xl font-bold">My Blog</h1>
                }

                <nav className="flex items-center gap-6">
                    {
                        isLoggedIn && <a href={"/post"} className="text-black dark:text-white hover:text-gray-300 transition h-fit">
                        + NEW POST
                    </a>
                    }
                    {
                        isLoggedIn &&
                        <a href={"/posts"} className="text-black dark:text-white hover:text-gray-300 transition h-fit">
                            EXPLORE
                        </a>
                    }
                    {
                        !isLoggedIn ?
                            <a href={"/auth"}
                               className="text-black dark:text-white hover:text-gray-300 transition h-fit">
                                LOGIN | SIGN UP
                            </a>
                            :
                            <a href={"/auth"} onClick={handleLogout}
                                    className="text-black dark:text-white hover:text-gray-300 transition">
                                <img alt="profile icon" src={dark ? logoutDark : logoutLight}/>
                            </a>
                    }
                    <button onClick={darkModeHandler}
                            className="text-black dark:text-white hover:text-gray-300 transition">
                        <img alt="profile icon" src={dark ? sun_icon : moon_icon}/>
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
