import { Get_All_Doctors } from "../actions/doctors-actions";
const initialState = {
  doctors: [],
};

export const doctorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Get_All_Doctors:
      return {
        ...state,
        doctors: action.payload,
      };
    default:
      return state;
  }
};
