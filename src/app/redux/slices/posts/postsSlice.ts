import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postsAPI } from '../../../api/api'
import { changeStatus } from '../status/statusSlice'

const initialState: PostsState = {
    posts: [],
    error: null
}

export const getAllPosts = createAsyncThunk<Post[], void, { rejectValue: string }>(
    'posts/getAllPosts',
    async (_, { dispatch, rejectWithValue }) => {
        dispatch(changeStatus('loading'))
        try {
            const response = await postsAPI.getAll()
            dispatch(changeStatus('succeeded'))
            return response.data
        } catch (error) {
            dispatch(changeStatus('error'))
            return rejectWithValue('Failed to fetch posts')
        }
    },
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.posts = action.payload
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.error = action.payload ?? null
            })
    }
})


export const postsReducer = postsSlice.reducer


export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface PostsState {
    posts: Post[];
    error: string | null
}
