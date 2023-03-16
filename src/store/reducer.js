import * as Actions from './action-types';
import images from './../services/images';

const INITIAL_STATE = {
  services: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.SET_SERVICES:
      return {
        ...state,
        services: action.payload,
      };
    case Actions.SET_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
