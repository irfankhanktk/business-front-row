import * as Actions from "./action-types";
import images from "./../services/images";

const INITIAL_STATE = {
  user_info: null,
  services: [],
  notification: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.SET_SERVICES:
      return {
        ...state,
        services: action.payload,
      };
    case Actions.SET_USER_INFO:
      return {
        ...state,
        user_info: action.payload,
      };
    case Actions.SET_USER_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    case Actions.SET_LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
};
