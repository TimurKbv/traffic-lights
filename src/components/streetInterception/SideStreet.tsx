import { FC, useEffect } from "react";
import { Color } from "../../types/colors/redGreenStatus";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { setCounter } from "../../features/counterSlice";
import { setBothYellowState, setDefaultYellowState, setSideYellowState } from "../../features/yellowLightSlice";
import { setAllRedState, setRedSideState, setSideStreetState } from "../../features/trafficLightSlice";



const SideStreet: FC= () => {
  const dispatch = useAppDispatch();
  const trafficLightsStatus = useAppSelector(state => state.trafficlight);
  const yellowStatus = useAppSelector(state => state.yellowlight);

const sideStreetHandler = () => {
  // wenn Nebenstrasse oder Fußgaengerüberweg grün ist => early return
  if (trafficLightsStatus.SIDE.status === Color.GREEN || trafficLightsStatus.CROSSWALK.status === Color.GREEN) {
    return;
  }
  // Nebenstrasse => gelb
  dispatch(setBothYellowState());
  dispatch(setRedSideState());

  const timerId = setTimeout(() => {
    dispatch(setAllRedState());
    dispatch(setSideYellowState());

    const id = setTimeout(() => {
      dispatch(setSideStreetState());
      dispatch(setCounter(0));
      dispatch(setDefaultYellowState());
      
    }, 1000);
    return () => clearTimeout(id);

  }, 1000);
  return () => clearTimeout(timerId);
};
useEffect(() => {

}, [trafficLightsStatus])

    return (
        <div className="side-street street">
            <div
              className="hold-line-side-street"
              onClick={sideStreetHandler}
            >
              Click
            </div>
            <div className="ampel">
              <div
                className={
                    trafficLightsStatus.SIDE.status === Color.RED
                    ? "red active active-red"
                    : "red"
                }
              ></div>
              <div 
                className={
                        yellowStatus.SIDE.status
                        ? "yellow active active-yellow"
                        : "yellow"
                    }
              ></div>
              <div
                className={
                    trafficLightsStatus.SIDE.status === Color.GREEN
                    ? "green active active-green"
                    : "green"
                }
              ></div>
            </div>
          </div>
    )
}


export default SideStreet;