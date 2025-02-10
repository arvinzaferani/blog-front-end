import React from "react";
import { useSelector } from "react-redux";
import {RootState} from "../../store/index.module";
import AlertComponent from "./AlertComponent";


const AlertContainer: React.FC = () => {
    const alertState = useSelector((state: RootState) =>  state.alerts)
    return (
        <div className="alert-container absolute flex flex-col justify-end items-start top-0 left-0 gap-4 z-20 p-8">
            {alertState.length >  0 ?
                alertState.map(alert => (
                    <AlertComponent alert={alert}/>
                )) : (<div/>)
            }
        </div>
    );
};

export default AlertContainer;
