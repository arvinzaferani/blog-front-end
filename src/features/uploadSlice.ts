import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../service/axiosConfig";
import { STATUS } from "../types/Status";
import {AlertError, AlertSuccess} from "./alertSlice";

interface FileState {
    file: File | null;
    image_url: string | null;
    loading: boolean;
    error: string | null;
    message: string | null;
    status: STATUS | null;
}

const initialState: FileState = {
    file: null,
    image_url: null,
    loading: false,
    error: null,
    status: null,
    message: null,
};


export const uploadFile = createAsyncThunk(
    "upload/file",
    async (file: File, { rejectWithValue, dispatch }) => {
        try {
            const formData = new FormData();
            formData.append("image", file);

            const response: any = await apiClient.post("/file/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            dispatch<any>(AlertSuccess({title: response?.success?.title, text: response?.success?.message}))
            return response.data;

        } catch (error: any) {

            dispatch<any>(AlertError({
                title: error.response?.data?.error?.title || "Upload failed",
                text: error.response?.data?.error?.message || "Something went wrong",
            }));
            return rejectWithValue(error.response?.data || "Upload failed");
        }
    }
);



const fileSlice = createSlice({
    name: "upload",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadFile.pending, (state) => {
                console.log("UPLOAD Pending"); // 🔹 Debug log
                state.status = STATUS.PENDING;
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadFile.fulfilled, (state, action: PayloadAction<{ message: string; image_url: string }>) => {
                console.log("UPLOAD filled", action.payload); // 🔹 Debug log
                state.status = STATUS.FULFILLED;
                state.message = action.payload.message;
                console.log(action.payload)
                state.image_url = action.payload?.image_url;
                state.loading = false;
            })
            .addCase(uploadFile.rejected, (state, action) => {
                console.log("UPLOAD REJECTED", action.payload);
                state.status = STATUS.REJECTED;
                state.error = typeof action.payload === "string" ? action.payload : "Something went wrong";
                state.loading = false;
            });
    },
});

export default fileSlice.reducer;
