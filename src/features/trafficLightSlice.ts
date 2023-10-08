import { createSlice } from "@reduxjs/toolkit";
import { Color,  defaultState } from "../types/colors/redGreenStatus";



export const trafficLightSlice = createSlice({
    name: 'trafficlight',
    initialState: defaultState,
    reducers: {
        setMainStreetState: (state) => {
            state.MAIN.status = Color.GREEN;
            state.SIDE.status = Color.RED;
            state.CROSSWALK.status = Color.RED;
        },
        setSideStreetState: (state) => {
            state.MAIN.status = Color.RED;
            state.SIDE.status = Color.GREEN;
            state.CROSSWALK.status = Color.RED;
        },
        setCrosswalkState: (state) => {
            state.MAIN.status = Color.RED;
            state.SIDE.status = Color.RED;
            state.CROSSWALK.status = Color.GREEN;
        },
        setMTransitionState: (state) => {
            state.MAIN.status = null;
            state.SIDE.status = null;
            state.CROSSWALK.status = Color.RED;
        },
        setRedMainState: (state) => {
            state.MAIN.status = Color.RED;
            state.SIDE.status = null;
            state.CROSSWALK.status = Color.RED;
        },
        setRedSideState: (state) => {
            state.MAIN.status = null;
            state.SIDE.status = Color.RED;
            state.CROSSWALK.status = Color.RED;
        },
        setAllRedState: (state) => {
            state.MAIN.status = Color.RED;
            state.SIDE.status = Color.RED;
            state.CROSSWALK.status = Color.RED;
        }
    }
});

export default trafficLightSlice.reducer;
export const { setAllRedState, setRedSideState, setRedMainState, setMTransitionState, setCrosswalkState, setSideStreetState, setMainStreetState } = trafficLightSlice.actions;