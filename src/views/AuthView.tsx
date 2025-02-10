import React from "react";
import {AuthComponent} from "../components/auth/AuthComponent";
const SignupView:React.FC = () => {
    return(
        <div className="flex flex-row justify-center items-center min-h-screen min-w-screen">
        <AuthComponent usage="Auth"/>
        </div>
    )
}
export default SignupView
