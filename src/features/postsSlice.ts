import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import apiClient from "../service/axiosConfig";
import {STATUS} from "../types/Status";
import {AlertError, AlertSuccess} from "./alertSlice";

export interface PostState {
    post: Post | null,
    posts: Post[];
    postsResponse: PostsResponse
    loading: boolean;
    error: string | null;
    status: STATUS | null;
    errorStatus: number | null;

}

export interface Post {
    _id?: string
    title: string,
    content: string,
    author?: {
        username: string,
        _id: string,
        profile_image_url?: string | null
    },
    createdAt?: Date,
    creator_id?: string,
    keywords: string[],
}

export interface PostsResponse {
    posts: Post[],
    meta: {
        total_posts: number,
        total_pages: number,
        current_page: number
    }
}

const initialState: PostState = {
    post: null,
    posts: [],
    loading: false,
    postsResponse: {
        posts: [],
        meta: {
            total_posts: 0,
            total_pages: 0,
            current_page: 1,
        }
    },
    status: null,
    error: null,
    errorStatus: null,

}


export const createPost = createAsyncThunk("posts/createPost",
    async (postData: Post, {rejectWithValue, dispatch}) => {
        try {
            const response:any = await apiClient.post("/protected/posts", {
                ...postData,
            })
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
export const updatePost = createAsyncThunk<Post, Post>("posts/updatePost",
    async (postData: Post, {rejectWithValue, dispatch}) => {
        try {
            const id = postData._id
            delete postData._id
            const response: any = await apiClient.put<Post>(`/protected/posts/${id}`, postData)
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
export const deletePost = createAsyncThunk<any, string>("post/deletePost",
    async (id: string,{rejectWithValue, dispatch}) => {
        try {
            const response: any = await apiClient.delete(`/protected/posts/${id}`)
            dispatch<any>(AlertSuccess({title: response?.success?.title, text: response?.success?.message}))

            return response.data
        } catch (error: any) {
            dispatch<any>(AlertError({
                title: error.response?.data?.error?.title || "Update Failed",
                text: error.response?.data?.error?.message || "Something went wrong",
            }));
            return error
        }
    })
export const fetchPosts = createAsyncThunk("posts/indexPost",
    async ({page, limit, userId}: { page: number; limit: number, userId?: string }, {rejectWithValue}) => {
        try {
            const response:{data: any, meta: any} = userId ? await apiClient.get(`/protected/users/posts/${userId}`, {
                params: {
                    page, limit
                }
            }) : await apiClient.get(`/protected/posts`, {
                params: {
                    page, limit
                }
            })

            const manipulatedResponse: any = {data: {...response.data, meta: response?.meta}}
            return manipulatedResponse.data
        } catch (err: any) {
            return rejectWithValue({error: err.response?.data, status: err?.response?.status})
        }
    })
export const getPost = createAsyncThunk("posts/getPost",
    async (id: string, {rejectWithValue}) => {
        try {
            const response = await apiClient.get(`/protected/posts/${id}`)
            return response.data
        } catch (err: any) {
            return rejectWithValue({error: err?.response?.data, status: err?.response?.status})
        }
    })
export const resetErrorState = () => {
    initialState.errorStatus = null
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.status = STATUS.PENDING
                state.error = null
                state.loading = true
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.status = STATUS.FULFILLED
                state.post = action.payload
                state.error = null
                state.loading = false
            })
            .addCase(createPost.rejected, (state, action: any) => {
                state.status = STATUS.REJECTED
                state.error = action?.payload?.message ?? 'something went wrong'
                state.loading = false
            })
        builder.addCase(fetchPosts.pending, (state) => {
            state.status = STATUS.PENDING
            state.loading = true
            state.error = null
        })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<PostsResponse>) => {
                state.status = STATUS.FULFILLED
                state.loading = false
                state.postsResponse = action.payload
                state.error = null
                state.postsResponse = {
                    posts: action.payload?.posts,
                    meta: {
                        total_pages: action.payload?.meta?.total_pages,
                        current_page: action.payload?.meta?.current_page,
                        total_posts: action.payload?.meta?.total_posts
                    }
                };

                state.posts = action.payload?.posts
            })
            .addCase(fetchPosts.rejected, (state, action: any) => {
                state.status = STATUS.REJECTED
                state.error = action?.payload?.message ?? 'something went wrong'
                state.errorStatus = action?.payload?.status ?? null;
                state.loading = false
            })
        builder
            .addCase(deletePost.pending, (state) => {
                state.status = STATUS.PENDING
                state.loading = true
                state.error = null
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.status = STATUS.FULFILLED
                state.loading = false
                const {id} = action.payload
                state.error = null
                state.posts = [...state.posts.filter(i => i._id !== id)]
            })
            .addCase(deletePost.rejected, (state, action: any) => {
                state.status = STATUS.REJECTED
                state.error = action?.payload?.message ?? 'something went wrong'
            })

        builder.addCase(getPost.pending, (state) => {
            state.status = STATUS.PENDING
            state.loading = true
            state.error = null
        })
            .addCase(getPost.fulfilled, (state, action: PayloadAction<{ post: Post }>) => {
                state.status = STATUS.FULFILLED
                state.loading = false
                state.post = action.payload.post
                state.error = null
            })
            .addCase(getPost.rejected, (state, action: any) => {
                state.status = STATUS.REJECTED
                state.error = action?.payload?.message ?? 'something went wrong'
                state.errorStatus = action?.payload?.status ?? null;
                state.loading = false
            })

    }
})
export default postsSlice.reducer
