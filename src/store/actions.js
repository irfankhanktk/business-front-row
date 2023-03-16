import {
  SET_SERVICES,
} from './action-types';


const setServices = (payload) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_SERVICES,
      payload,
    });
  };
};


export const ACTIONS = {
  setServices,
};
