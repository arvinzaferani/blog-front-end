import React, { useEffect, useState } from "react";
import { AlertState } from "../../features/alertSlice";
import { useDispatch } from "react-redux";
import { removeAlert } from "../../features/alertSlice";

interface AlertProps {
    alert: AlertState;
}

const AlertComponent: React.FC<AlertProps> = ({ alert }) => {
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(alert.visible);

    useEffect(() => {
        setIsVisible(alert.visible);
    }, [alert.visible]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            if (alert.id)
                dispatch(removeAlert(alert.id))
        }, 500);
    };

    return (
        <div
            className={`px-4 py-3 rounded shadow-md flex items-center justify-between transition-all duration-500 ease-in-out
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"} 
                ${alert.type === "success"
                ? "bg-green-100 text-green-700 border-l-4 border-green-500"
                : "bg-red-100 text-red-700 border-l-4 border-red-500"
            }`}
        >
            <div className="flex flex-col justify-start items-start w-[300px]">
                <p className="text-md font-bold">{alert.title}</p>
                <p className="text-sm">{alert.text}</p>
            </div>
            <button onClick={handleClose} className="ml-4 text-lg font-bold">
                ✖
            </button>
        </div>
    );
};

export default AlertComponent;
