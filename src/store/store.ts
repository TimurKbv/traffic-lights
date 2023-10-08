import { configureStore } from "@reduxjs/toolkit";
import counterSlice  from "../features/counterSlice";
import trafficLightSlice from "../features/trafficLightSlice";
import yellowLightSlice from "../features/yellowLightSlice";



const store = configureStore({
    reducer: {
        counter: counterSlice,
        trafficlight: trafficLightSlice,
        yellowlight: yellowLightSlice
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;