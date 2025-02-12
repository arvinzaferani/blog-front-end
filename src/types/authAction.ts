import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT} from "./actionTypes";
import {Dispatch} from "redux";
import axios from "axios";

interface LoginRequest {
    type: typeof LOGIN_REQUEST
}

interface LoginSuccess {
    type: typeof LOGIN_SUCCESS,
    payload: { token: string }
}
interface LoginFailure{
    type: typeof LOGIN_FAILURE,
    payload: { error: string }
}

interface Logout{
    type: typeof LOGOUT,
}
export type AuthActionTypes = LoginRequest | LoginSuccess | LoginFailure | Logout

export const Login = (username: string, password: string) => async (dispatch: Dispatch) => {
    dispatch({type: LOGIN_REQUEST})
    try{
        const response = await axios.post('/api/login', {username, password})
        const token = response.data
        localStorage.setItem('token', token)
        window.dispatchEvent(new Event("authChange"))
        dispatch({type: LOGIN_SUCCESS, payload: token})
    }
    catch (error: any){
        dispatch({type: LOGIN_FAILURE, payload: {error: error.response.data.massage}})
    }
}

export const logout = (): AuthActionTypes => {
    localStorage.removeItem('token')
    return {type: LOGOUT}
}
