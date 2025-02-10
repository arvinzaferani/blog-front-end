import React from "react";
import {AlertState} from "../../features/alertSlice";

interface AlertProps {
    alert: AlertState
    onClose?: () => void;

}

const AlertComponent: React.FC<AlertProps> = ({ alert, onClose }) => {
    const baseStyles = "px-4 py-3 rounded shadow-md flex items-center justify-between";
    const successStyles = "bg-green-100 text-green-700 border-l-4 border-green-500";
    const errorStyles = "bg-red-100 text-red-700 border-l-4 border-red-500";

    return (
        <div className={`${baseStyles} ${alert.type === "success" ? successStyles : errorStyles}`}>
            {alert ?
                (
                    <div className='flex flex-col justify-start items-start w-[300px]'>
                        <p className='text-md'>{alert.title}</p>
                        <p className='text-sm'>{alert.text}</p>
                    </div>
                )
                : (<></>)
            }
        </div>
    );
};

export default AlertComponent;
