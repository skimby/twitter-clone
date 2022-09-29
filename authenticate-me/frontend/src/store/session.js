import { csrfFetch } from "./csrf";

// types
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";


// actions
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};


// thunks
export const login = (user) => async (dispatch) => {
  const { username, password } = user;
  const response = await csrfFetch("/api/session/login", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      username,
      password
    })
  });

  const data = await response.json();
  dispatch(setUser(data));
  return data;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session/logout", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};


export const signup = (user) => async (dispatch) => {
  const { firstName,
    lastName,
    username,
    bio,
    email,
    location,
    website,
    profileImage,
    coverImage,
    password } = user;

  const response = await csrfFetch("/api/users/signup", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      bio,
      email,
      location,
      website,
      profileImage,
      coverImage,
      password
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// reducers
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      // console.log(action.payload)
      const setUserState = { ...state };
      setUserState.user = action.payload.user;
      return setUserState;

    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
