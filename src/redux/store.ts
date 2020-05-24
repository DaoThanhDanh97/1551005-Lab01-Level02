import { createStore, applyMiddleware } from "redux";
import { AppReducer } from "./reducer";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { appEpic$ } from "./epics";

export const epics = combineEpics(appEpic$);

const epicMiddleWare = createEpicMiddleware();

export default function configureStore() {
  const store = createStore(AppReducer, applyMiddleware(epicMiddleWare));

  epicMiddleWare.run(epics);

  return store;
}