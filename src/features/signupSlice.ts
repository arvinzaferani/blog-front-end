import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

interface SignupState {
    username: string,
    email: string,
    password: string,
    error: string | null,
}

const initialState: SignupState = {
    username: '',
    email: '',
    password: '',
    error: null,
}
const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setError: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        clearSignup: (state) => {
            state.username = ''
            state.email = ''
            state.password = ''
            state.error = null
        }

    }
})

export const {setUsername, setEmail, setPassword, setError, clearSignup} = signupSlice.actions
export default signupSlice.reducer
