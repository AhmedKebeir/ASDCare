import { Log_Out, SET_CHILDS_FOR_USER } from "../actions/user-actions";

const initialState = {
  children: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHILDS_FOR_USER:
      return {
        ...state,
        children: action.payload,
      };

    case Log_Out:
      return initialState;
    default:
      return state;
  }
};
