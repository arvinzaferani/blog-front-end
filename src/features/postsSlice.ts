import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import apiClient from "../service/axiosConfig";
import {STATUS} from "../types/Status";
export interface PostState{
    post: Post | {},
    posts: Post[];
    postsResponse: PostsResponse
    loading: boolean;
    error: string | null;
    status: STATUS | null

}
export interface Post{
    _id?: string
    title: string,
    content: string,
    author?: {
        username: string,
        _id: string,
    },
    createdAt?: Date,
    creator_id?: string,
    keywords: string[],
}

export interface PostsResponse{
    posts: Post[],
    total_posts: number,
    total_pages: number,
    current_pages: number
}

const initialState:PostState = {
    post: {},
    posts: [],
    loading: false,
    postsResponse: {
        posts: [],
        total_posts: 0,
        total_pages: 0,
        current_pages: 1,
    },
    status: null,
    error: null,
}


export const createPost = createAsyncThunk<Post, Post>("posts/createPost",
    async(postData:Post, {rejectWithValue}) => {
        try{
            const response = await apiClient.post<Post>("http://localhost:6969/protected/post", {...postData, author: localStorage.getItem('userID')})
            return response.data
        }
        catch(error: any){
            console.log(rejectWithValue(error.response?.data))
            return  rejectWithValue(error.response?.data)
        }

    })
export const fetchPosts = createAsyncThunk< PostsResponse, {page: number, limit: number} | null>("posts/indexPost",
    async (params: {page: number, limit: number}|null, {rejectWithValue}) => {
    try {
        const response = await apiClient.get("http://localhost:6969/protected/posts", {params} )
        return response.data
    }catch (err: any){
        return rejectWithValue(err.response.data)
    }

})
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.status = STATUS.PENDING
                state.loading = true
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.status = STATUS.FULFILlED
                state.post = action.payload
            })
            .addCase(createPost.rejected, (state, action) => {
                state.status = STATUS.REJECTED
                state.error = action.error.message ?? 'something went wrong'
            })
        builder.addCase(fetchPosts.pending, (state) =>{
            state.status = STATUS.PENDING
            state.loading = true
        })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = STATUS.FULFILlED
                state.loading = false
                state.postsResponse = action.payload
                state.posts = action.payload?.posts
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = STATUS.REJECTED
                state.error = action.error.message ?? 'something went wrong'
                state.loading = false
            })

    }
})
export default postsSlice.reducer
