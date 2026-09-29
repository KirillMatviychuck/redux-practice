import { configureStore } from '@reduxjs/toolkit'

import { statusReducer } from './slices/statusSlice'
import { todosReducer } from './slices/todosSlice'




export const store = configureStore({
    reducer: {
        todos: todosReducer,
        status: statusReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
