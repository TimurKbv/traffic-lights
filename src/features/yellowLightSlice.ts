import { createSlice } from "@reduxjs/toolkit";
import { defaultYellowState } from "../types/colors/yellowStatus";


export const yellowLightSlice = createSlice({
    name: 'yellowlight',
    initialState: defaultYellowState,
    reducers: {
        setSideYellowState: (state) => {
            state.SIDE.status = true;
            state.MAIN.status = false;
        },
        setMainYellowState: (state) => {
            state.SIDE.status = false;
            state.MAIN.status = true;
        },
        setDefaultYellowState: (state) => {
            state.SIDE.status = false;
            state.MAIN.status = false;
        },
        setBothYellowState: (state) => {
            state.SIDE.status = true;
            state.MAIN.status = true;
        },
    }
});

export default yellowLightSlice.reducer;
export const { setBothYellowState, setDefaultYellowState, setMainYellowState, setSideYellowState } = yellowLightSlice.actions;