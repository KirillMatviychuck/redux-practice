import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { changeStatus } from './statusSlice'
import { todosAPI } from '../../api/api'

const initialState: TodosState = {
    todos: [],
    filter: 'all',
    error: null,
    currentPage: 1,
    totalPages: 1
}

const calculateTotalPages = (totalTodos: TodoItem[]) => {
    return Math.ceil(totalTodos.length / 10)
}

export const getAllTodos = createAsyncThunk<TodoItem[], void, { rejectValue: string }>(
    'todos/getAllTodos',
    async (_, { dispatch, rejectWithValue }) => {
        dispatch(changeStatus('loading'))
        try {
            const response = await todosAPI.getAll()
            dispatch(changeStatus('succeeded'))
            return response.data
        } catch (error) {
            dispatch(changeStatus('error'))
            return rejectWithValue('Failed to fetch posts')
        }
    },
)

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setAll: (state) => {
            state.filter = 'all'
        },
        setActive: (state) => {
            state.filter = 'active'
        },
        setDone: (state) => {
            state.filter = 'done'
        },
        setPage(state, action) {
            state.currentPage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTodos.fulfilled, (state, action) => {
                state.todos = action.payload
                state.totalPages = calculateTotalPages(action.payload)

            })
            .addCase(getAllTodos.rejected, (state, action) => {
                state.error = action.payload ?? null
            })
    }
})

export const { setPage } = todosSlice.actions
export const todosReducer = todosSlice.reducer

export type Filter = 'all' | 'active' | 'done'

export interface TodoItem {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

interface TodosState {
    todos: TodoItem[];
    filter: Filter;
    error: string | null;
    currentPage: number;
    totalPages: number;
}
