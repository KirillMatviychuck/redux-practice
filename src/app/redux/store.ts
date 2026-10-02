import { configureStore } from '@reduxjs/toolkit'

import { statusReducer } from './slices/statusSlice'
import { todosReducer } from './slices/todosSlice'
import { todosApi } from '../api/todosAPI'




export const store = configureStore({
    reducer: {
        todos: todosReducer,
        status: statusReducer,

        [todosApi.reducerPath]: todosApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todosApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
