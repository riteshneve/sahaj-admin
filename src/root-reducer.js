import { combineReducers } from "redux-immutable";
import { connectRouter } from "connected-react-router";

import LoginReducer from "./views/login/login.reducer";
import InboxReducer from "./views/mailbox/inbox/inbox.reducer";

const reducers = {
  LoginReducer,
  InboxReducer
};

export default function createRootReducer(asyncReducers = {}, browserHistory) {
  const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(browserHistory),
    ...asyncReducers
  });

  return rootReducer;
}
