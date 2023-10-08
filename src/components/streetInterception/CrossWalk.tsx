import { FC } from "react";
import {
  Color,
} from "../../types/colors/redGreenStatus";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { setCounter } from "../../features/counterSlice";
import { setAllRedState, setCrosswalkState, setMTransitionState } from "../../features/trafficLightSlice";
import { setBothYellowState, setDefaultYellowState } from "../../features/yellowLightSlice";

const CrossWalk: FC = () => {
  const dispatch = useAppDispatch();
  const crossWalkLightsStatus = useAppSelector(
    (state) => state.trafficlight.CROSSWALK.status
  );

  const crosswalkHandler = () => {
    // wenn Fußgaengerueberweg schon gruen ist => early return
    if (crossWalkLightsStatus === Color.GREEN) {
      return;
    }
    // beide Strassen  => gelb
    dispatch(setMTransitionState());
    dispatch(setBothYellowState());

    // in 1 sec Fußgaengerueberweg => grün, Strassen => rot
    const timerId = setTimeout(() => {
      dispatch(setDefaultYellowState());
      dispatch(setAllRedState());

      const id = setTimeout(() => {
        dispatch(setCrosswalkState());
        dispatch(setCounter(0));
        
      }, 1000);
      return () => clearTimeout(id);

    }, 1000);
    return () => clearTimeout(timerId);
  };

  return (
    <div className="cross-walk" onClick={crosswalkHandler}>
      <span>Click</span>
      {/* 1 Ampel */}
      <div className="ampel-left ampel">
        <div
          className={
            crossWalkLightsStatus === Color.GREEN
              ? "green active active-green"
              : "green"
          }
        ></div>
        <div
          className={
            crossWalkLightsStatus === Color.RED
              ? "red active active-red"
              : "red"
          }
        ></div>
      </div>
      {/* 2 Ampel */}
      <div className="ampel-right ampel">
        <div
          className={
            crossWalkLightsStatus === Color.RED
              ? "red active active-red"
              : "red"
          }
        ></div>
        <div
          className={
            crossWalkLightsStatus === Color.GREEN
              ? "green active active-green"
              : "green"
          }
        ></div>
      </div>
    </div>
  );
};

export default CrossWalk;
