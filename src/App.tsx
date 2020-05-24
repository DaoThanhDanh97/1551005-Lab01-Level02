import React, { useState, useEffect } from "react";
import "./App.css";
import { Modal, CircularProgress } from "@material-ui/core";
import { Point, STATUS, AppState } from "./redux/reducer";
import Map from "./components/Map";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateMapData,
  UpdateMValue,
  UpdateNValue,
  UpdatePacman,
  UpdateGoal,
  UpdateSearchStatus,
  ResetAfterNewFile,
  UpdateGhostPosition,
} from "./redux/actions";
import SearchButton from "./components/SearchButton";
import Pacman from "./components/Pacman";
import Goal from "./components/Goal";
import Scoreboard from "./components/Scoreboard";
import Ghost from "./components/Ghost/Ghost";

function App() {
  const dispatch = useDispatch();

  const show = useSelector((state: AppState) => state.modalShow);

  const readChosenFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result?.toString();
      const textArrList = text?.split("\n") || [];
      // set m and n
      if (textArrList.length === 0) {
        alert("Oops! Something has happened!");
      } else {
        dispatch(ResetAfterNewFile.get());
        textArrList[0].split("x").forEach((item, index) => {
          const prsInt = parseInt(item);
          dispatch(
            index === 0 ? UpdateNValue.get(prsInt) : UpdateMValue.get(prsInt)
          );
        });
        const tPointList = [];
        for (let i = 1; i < textArrList.length - 1; i++) {
          tPointList.push(
            textArrList[i].split(" ").map((item, index) => {
              if (item === "2") {
                dispatch(UpdateGoal.get(new Point(i - 1, index, 2)));
              } else if (item === "3") {
                dispatch(UpdateGhostPosition.get(new Point(i - 1, index, 2)));
              }
              return new Point(i - 1, index, parseInt(item));
            })
          );
        }
        const arrInitPacman = textArrList[textArrList.length - 1]
          .split(",")
          .map((item) => parseInt(item));
        console.log(textArrList);
        const goalPoint = new Point(arrInitPacman[0], arrInitPacman[1], 5);
        dispatch(UpdatePacman.get(goalPoint));
        tPointList[arrInitPacman[0]][arrInitPacman[1]] = goalPoint;
        dispatch(UpdateMapData.get(tPointList));
        dispatch(UpdateSearchStatus.get(STATUS.WAITING));
      }
    };
    reader.onabort = async (e) => console.log("User cancelled");
    reader.readAsText(e.target?.files ? e.target?.files[0] : new Blob());
  };

  return (
    <div style={{ boxSizing: "content-box" }}>
      <div className="buttons">
        <input type="file" onChange={(e) => readChosenFile(e)} />
      </div>
      <Map>
        <Ghost />
        <Goal />
        <Pacman />
      </Map>
      <Scoreboard />
      <SearchButton />
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={show}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <CircularProgress color={"secondary"} />
      </Modal>
    </div>
  );
}

export default App;
