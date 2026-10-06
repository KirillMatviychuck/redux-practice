import { createSlice, type PayloadAction } from '@reduxjs/toolkit'


const initialState: TodosState = {
    filter: 'all',
    currentPage: 1,
}

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
        setPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        }
    }
})

export const { setPage, setActive, setAll, setDone } = todosSlice.actions
export const todosReducer = todosSlice.reducer

export type Filter = 'all' | 'active' | 'done'

interface TodosState {
    filter: Filter;
    currentPage: number;
}
