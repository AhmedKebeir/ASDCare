import { SET_CHILDS_FOR_USER } from "../actions/user-actions";

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
    default:
      return state;
  }
};
