import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { userReducer } from "./reducers/user-reducer";

const rootReducer = combineReducers({
  user: userReducer, // مهم جداً
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
