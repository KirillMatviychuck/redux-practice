import { createSlice } from "@reduxjs/toolkit";

const initialState: StatusState = {
    status: 'idle'
}


export const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {},
})


export const statusReducer = statusSlice.reducer


export type Statuses = 'idle' | 'loading' | 'error' | 'succeeded'
interface StatusState {
    status: Statuses
}