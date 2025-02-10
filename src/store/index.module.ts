import {configureStore} from "@reduxjs/toolkit";
import postReducer from "../features/postsSlice";
import userReducer from "../features/usersSlice";
import alertReducer from "../features/alertSlice";
import fileReducer from "../features/uploadSlice";

const store = configureStore({
    reducer: {
        post: postReducer,
        user: userReducer,
        alerts: alertReducer,
        file: fileReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
