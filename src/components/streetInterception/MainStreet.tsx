import { FC, useEffect } from "react";
import CrossWalk from "./CrossWalk";
import { Color } from "../../types/colors/redGreenStatus";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { setBothYellowState, setDefaultYellowState, setMainYellowState, setSideYellowState } from "../../features/yellowLightSlice";
import { incrementCounter, setCounter } from "../../features/counterSlice";
import { setAllRedState, setMainStreetState, setRedMainState, setRedSideState, setSideStreetState } from "../../features/trafficLightSlice";


const MainStreet: FC = () => {
  const counter = useAppSelector(state => state.counter.countdown);
  const dispatch = useAppDispatch();
  const trafficLightsStatus = useAppSelector(state => state.trafficlight);
  const yellowStatus = useAppSelector(state => state.yellowlight);

  useEffect(() => {

    const counterTimerId = setTimeout(() => {

      // wenn Hauptstrasse gruen 20 sec  => Nebenstrasse gelb => Nebenstrasse gruen
      if (trafficLightsStatus.MAIN.status === Color.GREEN && counter === 20) {
        dispatch(setBothYellowState());
        dispatch(setRedSideState());
        
        const timerId = setTimeout(() => {
          dispatch(setAllRedState());
          dispatch(setSideYellowState())

          const id = setTimeout(() => {
            dispatch(setSideStreetState());
            dispatch(setDefaultYellowState());
            dispatch(setCounter(0));
          
          }, 1000);
          return () => clearTimeout(id);
          
        }, 1000);
        return () => clearTimeout(timerId);
      }
      // wenn Nebenstrasse gruen 5 sec  => Hauptstrasse gelb => Hauptstrasse gruen
      if (trafficLightsStatus.SIDE.status === Color.GREEN && counter === 5) {
        dispatch(setBothYellowState());
        dispatch(setRedMainState());

        const id = setTimeout(() => {
          dispatch(setAllRedState())
          dispatch(setMainYellowState());

          const timerId = setTimeout(() => {
            dispatch(setMainStreetState());
            dispatch(setDefaultYellowState());
            dispatch(setCounter(0));
          }, 1000);
          return () => clearTimeout(timerId);

        }, 1000);
        return () => clearTimeout(id);
      }
      // wenn Fussgaengerüberweg gruen 3 sec  => Hauptstrasse gelb => Hauptstrasse gruen
      if (trafficLightsStatus.CROSSWALK.status === Color.GREEN && counter === 2) {
        dispatch(setMainYellowState());

        const timerId = setTimeout(() => {
          dispatch(setAllRedState());

          const id = setTimeout(() => {
            dispatch(setCounter(0));
            dispatch(setMainStreetState());
            dispatch(setDefaultYellowState());
  
          }, 1000);
          return () => clearTimeout(id);
        }, 1000);
      }
      dispatch(incrementCounter());

    }, 1000);

    return () =>  clearTimeout(counterTimerId)
  }, [counter]);

  
  return (
    <div className="main-street street">

      <div className="counter-container">
        <span> { counter } </span>
      </div>

      <div className="hold-line-main-street-left">
        {/* 1 Ampel */}
        <div className="ampel">
          <div
            className={
              trafficLightsStatus.MAIN.status === Color.GREEN 
                ? "green active active-green"
                : "green"
            }
          ></div>
          <div 
            className={
                yellowStatus.MAIN.status
                ? "yellow active active-yellow"
                : "yellow"
            }
          ></div>
          <div
            className={
              trafficLightsStatus.MAIN.status === Color.RED
                ? "red active active-red"
                : "red"
            }
          ></div>
        </div>
      </div>
        {/* 2 Ampel */}
      <div className="hold-line-main-street-right">
        <div className="ampel">
          <div
            className={
              trafficLightsStatus.MAIN.status === Color.GREEN
                ? "green active active-green"
                : "green"
            }
          ></div>
          <div 
            className={
              yellowStatus.MAIN.status
                ? "yellow active active-yellow"
                : "yellow"
            }
          ></div>
          <div
            className={
              trafficLightsStatus.MAIN.status === Color.RED
                ? "red active active-red"
                : "red"
            }
          ></div>
        </div>
      </div>

      <CrossWalk />
    </div>
  );
};

export default MainStreet;
