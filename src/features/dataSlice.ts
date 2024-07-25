import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
export interface Post {
    userId: number,
    Id: number,
    title: string,
    body: string,
}
interface DataSate {
    posts: Post[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null,

}

const initialState: DataSate = {
    posts: [],
    status: 'idle',
    error: null,
}

export const fetchData = createAsyncThunk('data/fetchData', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return response.data
})

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.posts = action.payload
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message ?? 'something went wrong'
            })

    }

})
 export default dataSlice.reducer
