import {configureStore} from "@reduxjs/toolkit";
import dataReducer from "../features/postsSlice";
import authReducer from "../features/authSlice";
import postReducer from "../features/postsSlice";

const store = configureStore({
    reducer: {
        data: dataReducer,
        auth: authReducer,
        post: postReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
