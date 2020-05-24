import { ofType, combineEpics, StateObservable } from "redux-observable";
import { pipe } from "rxjs";
import { map } from "rxjs/operators";
import {
  UpdateSearchStatus,
  UpdatePath,
  UpdatePathAndSearchStatus,
  NoAction,
} from "./actions";
import { STATUS, AppState } from "./reducer";
import configureStore from "./store";

// const store = configureStore();

const createPath$ = (action$: any, state$: StateObservable<any>) =>
  action$.pipe(
    ofType(UpdateSearchStatus.type),
    map((action: any) => {
      if (action.payload === STATUS.COMPLETED) {
        const currentGoal = state$.value.currentGoal;
        const currentMapData = state$.value.mapPoints;
        let tempPath = [];
        let trackPoint = Object.assign(
          {},
          currentMapData[currentGoal.x][currentGoal.y]
        );
        while (trackPoint.previousX !== -1 || trackPoint.previousY !== -1) {
          tempPath.unshift(trackPoint);
          trackPoint = Object.assign(
            {},
            currentMapData[trackPoint.previousX][trackPoint.previousY]
          );
        }
        return UpdatePathAndSearchStatus.get({
          path: tempPath,
          status: STATUS.PATHCOMPLETED,
        });
      }
      return NoAction.get();
    })
  );

const UpdatePath$ = (action$: any) =>
  action$.pipe(
    ofType(UpdatePathAndSearchStatus.type),
    map((action: any) => {
      return UpdatePath.get(action.payload);
    })
  );

const UpdateSearchStatusAfterPath$ = (action$: any) =>
  action$.pipe(
    ofType(UpdatePath.type),
    map((action: any) => {
      return UpdateSearchStatus.get(STATUS.PATHCOMPLETED);
    })
  );

export const appEpic$ = combineEpics(
  createPath$,
  UpdatePath$,
  UpdateSearchStatusAfterPath$
);
