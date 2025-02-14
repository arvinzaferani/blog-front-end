import {STATUS} from "../types/Status";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import apiClient from "../service/axiosConfig";
import {AlertError, AlertSuccess} from "./alertSlice";

export interface User {
    _id?: string| null
    credential?: string | null
    username: string
    email: string
    phone_number: string,
    first_name?: string,
    last_name?: string,
    profile_image_url?: string | null,
    createdAt?: string
    password?: string
    image?: string,
}

export interface UserState {
    currentUser: Partial<User> | null
    user: Partial<User> | null
    token: string | null;
    loading: boolean
    error: string | null
    status: STATUS | null
    code: number | null
}

const initialState: UserState = {
    currentUser: null,
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
    status: null,
    code: null
}


export const login = createAsyncThunk(
    "auth/login",
    async (payload: Partial<User>, { rejectWithValue, dispatch }) => {
        try {
            const response = await apiClient.post("/auth/login", payload);
            dispatch<any>(AlertSuccess({
                title: response.data?.success?.title || "Login Successful",
                text: response.data?.success?.message || "You have successfully logged in!",
            }));

            return response.data;
        } catch (err: any) {
            dispatch<any>(AlertError({
                title: err.response?.data?.error?.title || "Login Failed",
                text: err.response?.data?.error?.message || "Invalid credentials, please try again.",
            }));

            return rejectWithValue({
                error: err.response?.data?.message || err.message || "Something went wrong",
                status: err.response?.status || 500,
            });
        }
    }
);

export const register = createAsyncThunk('auth/register', async (payload: User, {rejectWithValue, dispatch}) =>  {
    try{
        const response: any = await apiClient.post('/auth/register', payload)
        dispatch<any>(AlertSuccess({title: response?.success?.title, text: response?.success?.message}))
        return response?.data
    }
    catch(err: any){
        dispatch<any>(AlertError({
            title: err.response?.data?.error?.title || "Register Failed",
            text: err.response?.data?.error?.message || "Invalid credentials, please try again.",
        }));
        return err
    }
})

export const getCurrentUser = createAsyncThunk('users/getUsers',
    async (_, {rejectWithValue}) => {
        try {
            const response = await apiClient.get("/protected/users")
            return response.data
        } catch (err: any) {
            return rejectWithValue({error: err.response.data, status: err?.response?.status})
        }
    })

export const updateCurrentUser = createAsyncThunk("posts/updatePost",
    async (userData: Partial<User>, {rejectWithValue, dispatch}) => {
        try {
            const response: any = await apiClient.put<Partial<User>>(`/protected/users`, userData)
            dispatch<any>(AlertSuccess({title: response?.success?.title, text: response?.success?.message}))
            return response.data
        } catch (error: any) {
            dispatch<any>(AlertError({
                title: error.response?.data?.error?.title || "Update Failed",
                text: error.response?.data?.error?.message || "Something went wrong",
            }));
            return rejectWithValue(error.response?.data)
        }
    })

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout(state){
            state.token = null
            state.currentUser = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentUser.pending, (state) => {
            state.status = STATUS.PENDING
            state.loading = true
        })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.status = STATUS.FULFILLED
                state.currentUser = action.payload.user
                state.error = null
                state.loading = false
            })
            .addCase(getCurrentUser.rejected, (state, action: any) => {
                state.status = STATUS.REJECTED
                state.error = action.payload?.message ?? 'something went wrong'
                state.loading = false
            })
            builder.addCase(login.pending, (state) => {
                state.status = STATUS.PENDING
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = STATUS.FULFILLED
                state.loading = false
                if(action.payload?.token) {
                    localStorage.setItem('token', action.payload?.token)
                    window.dispatchEvent(new Event("authChange"))
                }
                if(action.payload?.user_id)
                    localStorage.setItem('userID', action.payload?.user_id)
                state.code = action.payload?.status
                state.error = null
                state.currentUser = action.payload.user
            })
            .addCase(login.rejected, (state, action: any) => {
                state.status = STATUS.REJECTED
                state.error = action.payload?.message ?? 'something went wrong'
                state.code = action.payload?.status
                state.loading = false
            })
            builder.addCase(register.pending, (state) => {
                state.status = STATUS.PENDING
                state.loading = true
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = STATUS.FULFILLED
                state.loading = false
                state.error = null
                if(action.payload?.token) {
                    localStorage.setItem('token', action.payload?.token)
                    window.dispatchEvent(new Event("authChange"))
                }
                if(action.payload?.user_id)
                    localStorage.setItem('userID', action.payload?.user_id)
                state.code = action.payload?.status
                state.currentUser = action.payload.user
            })
            .addCase(register.rejected, (state, action: any) => {
                state.status = STATUS.REJECTED
                state.error = action?.payload?.message ?? 'something went wrong'
                state.code = action.payload?.status
                state.loading = false
            })
            builder.addCase(updateCurrentUser.pending, (state) => {
                state.status = STATUS.PENDING
                state.loading = true
            })
            .addCase(updateCurrentUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = STATUS.FULFILLED
                state.loading = false
                state.error = null
                state.currentUser = action.payload.user
            })
            .addCase(updateCurrentUser.rejected, (state, action: any) => {
                state.status = STATUS.REJECTED
                state.error = action?.payload?.message ?? 'something went wrong'
                state.loading = false
            })
    }
})
export default userSlice.reducer
export const { logout } = userSlice.actions
