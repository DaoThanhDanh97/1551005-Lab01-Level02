import { PlainAction } from "redux-typed-actions";
import {
  UpdateMapData,
  UpdateGoal,
  UpdatePacman,
  UpdateModalStatus,
  UpdatePath,
  UpdateSearchStatus,
  UpdateMValue,
  UpdateNValue,
  ResetAfterNewFile,
  UpdatePoint,
  UpdateGhostPosition,
} from "./actions";

export class Point {
  x: number;
  y: number;
  value: any;
  distFromStart: number;
  previousX: number;
  previousY: number;
  isVisited: boolean;

  constructor(px: number, py: number, pval: any) {
    this.x = px;
    this.y = py;
    this.value = pval;
    this.distFromStart = pval === 5 ? 0 : Number.MAX_VALUE;
    this.previousX = -1;
    this.previousY = -1;
    this.isVisited = false;
  }

  updatePreviousPoint(newDist: number, prevX: number, prevY: number) {
    this.distFromStart = newDist;
    this.previousX = prevX;
    this.previousY = prevY;
  }

  visitPoint() {
    this.isVisited = true;
  }
}

export enum STATUS {
  WAITINGFILE,
  WAITING,
  COMPLETED,
  FAILED,
  PATHCOMPLETED,
  ROUTECOMPLETED,
}

export interface AppState {
  mapPoints: Point[][];
  currentPacman: Point;
  currentGoal: Point;
  mapStatus: STATUS;
  modalShow: boolean;
  pacmanPath: Point[];
  mValue: number;
  nValue: number;
  score: number;
  ghostPosition: Point;
}

const initialState: AppState = {
  mapPoints: [],
  currentPacman: new Point(-1, -1, -1),
  currentGoal: new Point(-1, -1, -1),
  mapStatus: STATUS.WAITINGFILE,
  modalShow: false,
  pacmanPath: [],
  mValue: 0,
  nValue: 0,
  score: 100,
  ghostPosition: new Point(-1, -1, -1),
};

export const AppReducer = (
  state: AppState = initialState,
  action: PlainAction
) => {
  switch (action.type) {
    case UpdateMapData.type:
      return {
        ...state,
        mapPoints: action.payload,
      };
    case UpdateMValue.type:
      return {
        ...state,
        mValue: action.payload,
      };
    case UpdateNValue.type:
      return {
        ...state,
        nValue: action.payload,
      };
    case UpdateGoal.type:
      return {
        ...state,
        currentGoal: action.payload,
      };
    case UpdatePacman.type:
      return {
        ...state,
        currentPacman: action.payload,
      };
    case UpdateGhostPosition.type:
      return {
        ...state,
        ghostPosition: action.payload,
      };
    case UpdateModalStatus.type:
      return {
        ...state,
        modalShow: action.payload,
      };
    case UpdatePath.type:
      return {
        ...state,
        pacmanPath: action.payload.path,
      };
    case UpdateSearchStatus.type:
      return {
        ...state,
        mapStatus: action.payload,
      };
    case ResetAfterNewFile.type:
      return initialState;
    case UpdatePoint.type:
      return {
        ...state,
        score: state.score + action.payload,
      };
    default:
      return state;
  }
};
