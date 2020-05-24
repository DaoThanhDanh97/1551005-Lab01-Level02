import React from "react";
import "./Ghost.css";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/reducer";

export default function Ghost() {
  const currentGhost = useSelector((state: AppState) => state.ghostPosition);

  return currentGhost.x > -1 ? (
    <div
      className="ghost blinky"
      style={{
        position: "absolute",
        top: 50 + currentGhost.x * 20,
        left: 16 + currentGhost.y * 20,
      }}
    >
      <div className="eyes">
        <div className="eye leftEye">
          <div className="iris"></div>
        </div>
        <div className="eye rightEye">
          <div className="iris"></div>
        </div>
      </div>
      <div className="ghostTail"></div>
    </div>
  ) : (
    <div></div>
  );
}
