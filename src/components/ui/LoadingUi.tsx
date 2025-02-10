import loading from "../../assets/icons/loading.svg";
import React from "react";
const LoadingComponent:React.FC = () => {
    return  (
        <div className='flex flex-row justify-center items-center'>
            <img  className='animate-spin' src={loading} alt='loading'/>
        </div>
    )
}
