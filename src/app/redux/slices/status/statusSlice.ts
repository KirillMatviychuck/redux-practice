import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


const initialState: StatusState = {
    status: 'idle'
}


export const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        changeStatus: (state, action: PayloadAction<Statuses>) => {
            state.status = action.payload
        }
    }
})


export const { changeStatus } = statusSlice.actions
export const statusReducer = statusSlice.reducer


export type Statuses = 'idle' | 'loading' | 'error' | 'succeeded'
interface StatusState {
    status: Statuses
}