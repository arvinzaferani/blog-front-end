import loadingDark from "../../assets/icons/loading-dark.svg";
import loadingLight from "../../assets/icons/loading-light.svg";
import React, {useEffect, useState} from "react";

const LoadingUi: React.FC = () => {
    const [dark, setDark] = useState<boolean>(false);
    useEffect(() => {
        const darkStorage = localStorage.getItem("dark");
        if (darkStorage === "1") {
            setDark(true);
        } else {
            setDark(false);
        }
    }, []);
    return (
        <div className='flex flex-row justify-center items-center'>
            {dark ?
                <img className='animate-spin' src={loadingDark} alt='loading dark'/> :
                <img className='animate-spin' src={loadingLight} alt='loading loght'/>
            }
        </div>
    )
}
export default LoadingUi
