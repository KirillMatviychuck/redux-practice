import { configureStore } from '@reduxjs/toolkit'

import { statusReducer } from './slices/status/statusSlice'
import { postsReducer } from './slices/posts/postsSlice'




export const store = configureStore({
    reducer: {
        posts: postsReducer,
        status: statusReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
