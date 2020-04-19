import { BehaviorSubject } from "rxjs";
import { createEpicMiddleware, ofType } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { mergeMap, takeUntil } from "rxjs/operators";
import { combineEpics } from "redux-observable";

import { loginEpic } from "views/login/login.epic";

export const epic$ = new BehaviorSubject(
  combineEpics(
    loginEpic
  )
);
export const dependencies = {
  getJSON: ajax.getJSON
};

export const epicMiddleWare = createEpicMiddleware({
  dependencies
});

export const rootEpic = (action$, ...rest) =>
  epic$.pipe(
    mergeMap(epic =>
      epic(action$, ...rest).pipe(takeUntil(action$.pipe(ofType("EPIC_END"))))
    )
  );
