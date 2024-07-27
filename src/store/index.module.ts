import {configureStore} from "@reduxjs/toolkit";
import dataReducer from "../features/postsSlice";
import signupReducer from "../features/signupSlice"

const store = configureStore({
    reducer: {
        data: dataReducer,
        signup: signupReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
