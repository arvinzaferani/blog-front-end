import React from "react";
import Header from "./Header";
import { RouterProvider} from "react-router-dom";
import router from "../../router";
import AlertContainer from "../alert/AlertContainer";


const MainTemplate: React.FC = () => {
    return (

        <div className=" relative bg-white min-h-screen dark:bg-black flex flex-col justify-center items-center overflow-y-scroll">
            <AlertContainer/>
            <Header/>
            <RouterProvider router={router} className="relative" />
        </div>
    )
}
export default MainTemplate
