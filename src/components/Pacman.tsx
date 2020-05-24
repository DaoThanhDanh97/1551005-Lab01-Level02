import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { AppState, STATUS } from "../redux/reducer";
import {
  UpdatePacman,
  UpdatePath,
  UpdatePoint,
  UpdateSearchStatus,
} from "../redux/actions";

export default function Pacman() {
  const currentPacman = useSelector((state: AppState) => state.currentPacman);

  const status = useSelector((state: AppState) => state.mapStatus);
  const currentPath = useSelector((state: AppState) => state.pacmanPath);

  const dispatch = useDispatch();

  const [currentRotation, setCurrentRotation] = useState(0);

  //   const previousPacman = useRef(currentPacman);

  useEffect(() => {
    if (currentPath && currentPath.length > 0) {
      const nPath = currentPath.filter((item, index) => index > 0);
      setTimeout(() => {
        if (currentPath[0].x > currentPacman.x) {
          setCurrentRotation(1);
        } else if (currentPath[0].x < currentPacman.x) {
          setCurrentRotation(-1);
        } else setCurrentRotation(currentPath[0].y < currentPacman.y ? 2 : 0);
        dispatch(UpdatePacman.get(currentPath[0]));
        dispatch(UpdatePoint.get(-1));
        dispatch(
          UpdatePath.get({
            path: nPath,
          })
        );
      }, 150);
    } else if (currentPath.length === 0 && status === STATUS.PATHCOMPLETED) {
      dispatch(UpdatePoint.get(20));
      dispatch(UpdateSearchStatus.get(STATUS.ROUTECOMPLETED));
    }
  }, [currentPath]);

  return (
    <div
      style={{
        ...styles.pacman,
        position: "absolute",
        top: 50 + currentPacman.x * 20,
        left: 16 + currentPacman.y * 20,
        display: status !== STATUS.WAITINGFILE ? "flex" : "none",
        transform: `rotate(${currentRotation * 90}deg)`,
      }}
    >
      <div className="pacman">
        <div className="pacman-mouth"></div>
      </div>
    </div>
  );
}

const styles = {
  pacman: {
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    zIndex: 100,
  },
};
