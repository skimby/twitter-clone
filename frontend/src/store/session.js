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

  const formData = new FormData();
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("username", username);
  formData.append("bio", bio);
  formData.append("email", email);
  formData.append("location", location);
  formData.append("website", website);
  formData.append("coverImage", coverImage);
  formData.append("password", password);

  if (profileImage) formData.append("image", profileImage);
  // if (!profileImage) formData.append("image", 'https://secure.gravatar.com/avatar/c51f0fc9375c537923f6bf012b337f43?s=150&d=mm&r=g')

  console.log(profileImage)

  const response = await csrfFetch("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData
  });
  const data = await response.json();
  dispatch(setUser(data.user))

  return response;
};

// reducers
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
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
