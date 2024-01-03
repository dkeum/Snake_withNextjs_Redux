import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export type initialState = {
    countBy: number,
    total: number
} 


const initialState:initialState= {
    countBy: 1,
    total: 0
}

export const counterSlice = createSlice({
    name: 'counter', 
    initialState,
    reducers: {
        increment: (state) =>{
            state.total += state.countBy;
        },
        decrement: (state)=> {
            state.total -=state.countBy;
        },
        setCount: (state,action:PayloadAction<number>) => {
            state.countBy = action.payload 
        },
        resetAll: (state) => {
            state.total = 0
            state.countBy = 1
        }

    }
})

export const {increment,decrement, setCount,resetAll} = counterSlice.actions
export default counterSlice.reducer;