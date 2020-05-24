import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState, STATUS, Point } from "../redux/reducer";
import {
  UpdateSearchStatus,
  UpdateModalStatus,
  UpdateMapData,
} from "../redux/actions";

export default function SearchButton() {
  const searchStatus = useSelector((state: AppState) => state.mapStatus);
  const currentGoal = useSelector((state: AppState) => state.currentGoal);
  const startPacman = useSelector((state: AppState) => state.currentPacman);
  const mapData = useSelector((state: AppState) => state.mapPoints);

  const dispatch = useDispatch();

  const triggerShowHide = () => {
    dispatch(UpdateModalStatus.get(true));
    let tempArr: Point[][] = [];
    for (let i = 0; i < mapData.length; i++) {
      tempArr[i] = mapData[i].slice();
    }
    aStarSearch([startPacman], tempArr, startPacman);
  };

  const getManhattanHValue = (p1: Point, p2: Point) =>
    Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);

  const isGoalOrPath = (val: number) => val === 0 || val === 2;

  const aStarSearch: (
    aStarStack: Point[],
    pointList: Point[][],
    startPoint: Point | null
  ) => any = (
    aStarStack: Point[],
    pointList: Point[][],
    startPoint: Point | null
  ) => {
    if (aStarStack.length === 0) {
      alert("This map has no suitable answer!");
      dispatch(UpdateModalStatus.get(false));
      dispatch(UpdateSearchStatus.get(STATUS.FAILED));
      return;
    } else if (
      startPoint != null &&
      startPoint.x === currentGoal.x &&
      startPoint.y === currentGoal.y
    ) {
      dispatch(UpdateModalStatus.get(false));
      dispatch(UpdateMapData.get(pointList));
      dispatch(UpdateSearchStatus.get(STATUS.COMPLETED));
      return;
    }
    const firstItem = aStarStack.shift() || null;
    const { x, y, distFromStart } = firstItem as Point;
    pointList[x][y].visitPoint();
    const nextDist = distFromStart + 1;
    // for 4 T-adjacent points from the current standing point, update
    // the distance from start, previous X, previous Y if possible
    if (
      isGoalOrPath(pointList[x + 1][y].value) &&
      nextDist < pointList[x + 1][y].distFromStart
    ) {
      pointList[x + 1][y].updatePreviousPoint(nextDist, x, y);
    }
    if (
      isGoalOrPath(pointList[x - 1][y].value) &&
      nextDist < pointList[x - 1][y].distFromStart
    ) {
      pointList[x - 1][y].updatePreviousPoint(nextDist, x, y);
    }
    if (
      isGoalOrPath(pointList[x][y + 1].value) &&
      nextDist < pointList[x][y + 1].distFromStart
    ) {
      pointList[x][y + 1].updatePreviousPoint(nextDist, x, y);
    }
    if (
      isGoalOrPath(pointList[x][y - 1].value) &&
      nextDist < pointList[x][y - 1].distFromStart
    ) {
      pointList[x][y - 1].updatePreviousPoint(nextDist, x, y);
    }
    // add new values / edit old values to A-star stack
    let tmpAStarStack: Point[] = aStarStack.slice();
    [
      pointList[x + 1][y],
      pointList[x - 1][y],
      pointList[x][y + 1],
      pointList[x][y - 1],
    ].forEach((item) => {
      const index = tmpAStarStack.findIndex(
        (i) => i.x === item.x && i.y === item.y
      );
      if (isGoalOrPath(item.value) && item.isVisited === false) {
        index > -1 ? (tmpAStarStack[index] = item) : tmpAStarStack.push(item);
      }
    });
    // sort A-star stack based on f(n) = g(n) + h(n) => g(n) => x => y
    tmpAStarStack.sort((a, b) => {
      const aStarValueOfA =
        a.distFromStart + getManhattanHValue(a, currentGoal);
      const aStarValueOfB =
        b.distFromStart + getManhattanHValue(b, currentGoal);
      return aStarValueOfA < aStarValueOfB ||
        (aStarValueOfA === aStarValueOfB &&
          a.distFromStart < b.distFromStart) ||
        (aStarValueOfA === aStarValueOfB &&
          a.distFromStart === b.distFromStart &&
          a.x < b.x) ||
        (aStarValueOfA === aStarValueOfB &&
          a.distFromStart === b.distFromStart &&
          a.x === b.x &&
          a.y < b.y)
        ? -1
        : 1;
    });
    return aStarSearch(tmpAStarStack, pointList, firstItem);
  };

  return searchStatus === STATUS.WAITING ? (
    <input
      type="button"
      value="Start finding path"
      onClick={() => triggerShowHide()}
    />
  ) : (
    <div />
  );
}
