import React from "react";
import Header from "./Header";
import { RouterProvider} from "react-router-dom";
import router from "../../router";



const MainTemplate: React.FC = () => {
    return (
        <div className="template">
            <Header/>
                <RouterProvider router={router} />
        </div>
    )
}
export default MainTemplate
