import {
  SET_SERVICES,
  SET_USER_INFO,
} from './action-types';


const setServices = (payload) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_SERVICES,
      payload,
    });
  };
};
export const setUserInfo = (payload) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_USER_INFO,
      payload,
    });
  };
};


export const ACTIONS = {
  setServices,
};
