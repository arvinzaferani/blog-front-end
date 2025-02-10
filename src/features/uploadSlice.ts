import {createAsyncThunk} from "@reduxjs/toolkit";
import apiClient from "../service/axiosConfig";

export const uploadFile = createAsyncThunk('upload/file', async (payload: File) => {
    try {
        const response = await apiClient.post('/auth/login', payload)
        console.log(response)
        return response
    }
    catch (err){
        return err
    }
})
