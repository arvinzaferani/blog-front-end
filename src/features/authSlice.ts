import {createSlice,PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    loading: boolean;
    token: string|null;
    active_user_id: string|null;
    error: string|null;
}
interface AuthActionSuccess {
    token: string;
    user_id: string

}
const initialState: AuthState = {
    loading: false,
    token: localStorage.getItem('token'),
    active_user_id: localStorage.getItem('userID'),
    error: null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        loginRequest: (state) =>{
            state.loading = true
            state.error = null
        },
        loginSuccess: (state, action: PayloadAction<AuthActionSuccess>) => {
            state.loading = false
                state.error = null
                state.token = action.payload.token
            state.active_user_id = action.payload.user_id
                localStorage.setItem('token', state.token)
                localStorage.setItem('userID', state.active_user_id)

        },
        loginFailure: (state, action: PayloadAction<string>) => {

            state.loading = false
            state.error = action.payload
        },
        logout:(state) =>{
            state.token = null
        }
    }
})
export const {loginRequest, loginSuccess, loginFailure, logout} = authSlice.actions
export default authSlice.reducer;
