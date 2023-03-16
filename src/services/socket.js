import socketClient from "socket.io-client";
import {
  SET_COMMENTS,
  SET_HOME_CATEGORIES,
  SET_MESSAGES,
  SET_NOTIFICATIONS,
  SET_ONLINE_USERS,
} from "./../store/action-types";
import API_REQUESTS from "./../store/api-requests";
import { IP, URLS } from "./../store/api-urls";

export const socket = socketClient(IP);
// export default socket;
// export the function to connect and use socket IO:
const init = () => {
  return (dispatch, getState) => {
    socket.emit("init", getState().state.user_info, (error) => {
      alert(error);
    });
  };
};
const updateOnlineUsers = (users) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_ONLINE_USERS,
      payload: users,
    });
  };
};
// const sendMessage = (payload, socket_id) => {
//     // alert('send')
//     return (dispatch, getState) => {
//         socket.emit('sendMessage', { ...payload, socket_id },
//             (error) => {
//                 alert(error);
//             });
//             dispatch({
//                  type:'',

//             })
//     };
// };
const receiveMessage = (data) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_MESSAGES,
      payload: [...getState()?.state?.messages, data],
    });
  };
};
const setHomePosts = (data) => {
  return (dispatch, getState) => {
    const home_posts = { ...getState()?.state?.home_posts };
    dispatch({
      type: SET_HOME_CATEGORIES,
      payload: {
        ...home_posts,
        data: [data, ...getState()?.state?.home_posts?.data],
      },
    });
  };
};

const setPostComment = (data, my_id, bool) => {
  return async (dispatch, getState) => {
    try {
      if (bool) {
        dispatch({
          type: SET_COMMENTS,
          payload: [...getState()?.state?.comments, data],
        });
      }

      if (my_id === data?.post_owner_id) {
        const response = await API_REQUESTS.getData(
          `${URLS.notifications.receive}${my_id}`
        );
        dispatch({
          type: SET_NOTIFICATIONS,
          payload: {
            data: response?.data?.data,
            pagination: {},
          },
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

const setPostCommentCounter = (post_id) => {
  return (dispatch, getState) => {
    const home_posts = getState()?.state?.home_posts;
    const post_index = home_posts?.data?.findIndex((x) => x.id === post_id);
    if (post_index >= 0) {
      home_posts.data[post_index].total_comments++;

      dispatch({
        type: SET_HOME_CATEGORIES,
        payload: { ...home_posts, data: home_posts?.data },
      });
    } else {
      dispatch({
        type: "",
      });
    }
  };
};
const setPostLike = (data, my_id) => {
  return async (dispatch, getState) => {
    try {
      let copy = [...getState()?.state?.home_posts?.data];
      let index = copy?.findIndex((p) => {
        return p.id === data?.id;
      });

      if (index < 0) {
        return;
      }

      copy[index] = { ...data, like_by_me: copy[index]?.like_by_me };

      dispatch({
        type: SET_HOME_CATEGORIES,
        payload: {
          ...getState()?.state?.home_posts,
          data: copy,
        },
      });
      //if id is mine in post, means it's my post
      // console.log('data of like post :',data);
      // console.log('my_id',my_id);
      // console.log('data?.post_owner_id',data?.user_id);
      if (data?.user_id === my_id) {
        const response = await API_REQUESTS.getData(
          `${URLS.notifications.receive}${my_id}`
        );
        // console.log('resp of noti::',response?.data);
        dispatch({
          type: SET_NOTIFICATIONS,
          payload: {
            data: response?.data?.data,
            pagination: {},
          },
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
export const socketServices = {
  init,
  updateOnlineUsers,
  // sendMessage,
  receiveMessage,
  setPostLike,
  setPostComment,
  setPostCommentCounter,
  setHomePosts,
};
