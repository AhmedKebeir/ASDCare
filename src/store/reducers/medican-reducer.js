import { Get_All_Medican } from "../actions/medican-actions";

const initialState = {
  medicans: [],
};

export const medicansReducer = (state = initialState, action) => {
  switch (action.type) {
    case Get_All_Medican:
      return {
        ...state,
        medicans: action.payload,
      };
    default:
      return state;
  }
};
