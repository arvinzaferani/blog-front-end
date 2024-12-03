import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/index.module";
import axios from "axios";
import {loginFailure, loginRequest, loginSuccess, logout} from "../../features/authSlice";

export const AuthComponent: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const auth = useSelector((state: RootState) => state.auth)
    const resetForm  = () => {
        setUsername('')
        setPassword('')
        setEmail('')
    }
    const handleLogin = async () => {
        dispatch(loginRequest())
        try {
            const response = await axios.post('http://localhost:6969/auth/login', {username, password, email})
            dispatch(loginSuccess(response.data))
            resetForm()
        } catch (err: any) {
            dispatch(loginFailure(err.response?.data?.message))
        }
    }
    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:6969/auth/register', {username,password, email}).then((response)=>{
                alert(response.data?.data)
            })
            resetForm()
        }
        catch (err){
            alert(err)
        }
    }
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userID')
        dispatch(logout())
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <h3 className="text-xl font-bold text-gray-700 mb-4">
                Authentication
            </h3>


            {auth.token ? (
                <div className="bg-white shadow-md rounded-lg p-6 text-center max-w-md w-full">
                    <h3 className="text-2xl font-semibold text-green-600 mb-4">
                        Welcome! You are logged in.
                    </h3>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={handleLogin}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                            Login
                        </button>
                        <button
                            onClick={handleRegister}
                            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                            Register
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

}
