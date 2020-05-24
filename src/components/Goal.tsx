import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState, STATUS } from "../redux/reducer";
import "../App.css";
import { UpdatePoint } from "../redux/actions";

export default function Goal() {
  const currentGoal = useSelector((state: AppState) => state.currentGoal);
  const status = useSelector((state: AppState) => state.mapStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === STATUS.ROUTECOMPLETED) {
      dispatch(UpdatePoint.get(20));
    }
  }, [status]);

  return (
    <div
      style={{
        ...styles.goal,
        position: "absolute",
        top: 50 + currentGoal.x * 20,
        left: 16 + currentGoal.y * 20,
        display:
          status !== STATUS.WAITINGFILE && status !== STATUS.ROUTECOMPLETED
            ? "flex"
            : "none",
      }}
    >
      <div className="goal"></div>
    </div>
  );
}

const styles = {
  goal: {
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    zIndex: 50,
  },
};
