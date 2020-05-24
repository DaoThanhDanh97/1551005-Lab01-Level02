import React from "react";
import { useSelector } from "react-redux";
import { AppState, STATUS } from "../redux/reducer";

export default function Scoreboard() {
  const score = useSelector((state: AppState) => state.score);
  const status = useSelector((state: AppState) => state.mapStatus);

  return status !== STATUS.WAITINGFILE ? (
    <div>{`Current score: ${score}`}</div>
  ) : (
    <div />
  );
}
