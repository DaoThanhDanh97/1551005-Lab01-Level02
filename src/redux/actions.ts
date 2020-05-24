import { defineAction } from "redux-typed-actions";
import { Point, STATUS } from "./reducer";

export const UpdateMapData = defineAction<Point[][]>("UPDATE_MAP_DATA");
export const UpdatePacman = defineAction<Point>("UPDATE_PACMAN");
export const UpdateGoal = defineAction<Point>("UPDATE_GOAL");
export const UpdateModalStatus = defineAction<boolean>("UPDATE_MODAL_STATUS");
export const UpdateSearchStatus = defineAction<STATUS>("UPDATE_SEARCH_STATUS");
export const UpdatePath = defineAction<{ path: Point[] }>("UPDATE_PATH");
export const UpdateMValue = defineAction<number>("UPDATE_M_VALUE");
export const UpdateNValue = defineAction<number>("UPDATE_N_VALUE");
export const UpdatePoint = defineAction<number>("UPDATE_POINT");

export const UpdatePathAndSearchStatus = defineAction<any>(
  "UPDATE_PATH_AND_SEARCH_STATUS"
);

export const ResetAfterNewFile = defineAction<any>("RESET_AFTER_NEW_FILE");

export const NoAction = defineAction<any>("NO_ACTION");

export const UpdateGhostPosition = defineAction<Point>("UPDATE_GHOST_POSITION");
