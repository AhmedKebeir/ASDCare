import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { userReducer } from "./reducers/user-reducer";
import { doctorsReducer } from "./reducers/doctors-reducer";
import { medicansReducer } from "./reducers/medican-reducer";

const rootReducer = combineReducers({
  user: userReducer, // مهم جداً
  doctors: doctorsReducer,
  medicans: medicansReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
