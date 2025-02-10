import React from "react";
import { useSelector } from "react-redux";
import AlertComponent from "./AlertComponent";
import {AlertState} from "../../features/alertSlice";
import {RootState} from "../../store/index.module";

const AlertContainer: React.FC = () => {
    const alerts: AlertState[] = useSelector((state: RootState) => state.alerts);

    if (alerts.length === 0) return null;

    return (
        <div className="fixed flex flex-col justify-start items-start top-[60px] min-h-[200px] left-0 gap-4 z-20 p-8">
            {alerts.map((alert) => (
                <AlertComponent key={alert.id} alert={alert} />
            ))}
        </div>
    );
};

export default AlertContainer;
