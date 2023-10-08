import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type Counter = {
    countdown: number 
}

const initialState: Counter = {
    countdown: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incrementCounter: (state) => {
            state.countdown++
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
          state.countdown += action.payload
        },
        setCounter: (state, action: PayloadAction<number>) => {
            state.countdown = action.payload
          },
    }
})

export const { incrementCounter, incrementByAmount, setCounter  } = counterSlice.actions;
export default counterSlice.reducer;