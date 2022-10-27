import { csrfFetch } from "./csrf";


// TYPE
const GET_USER = 'users/getUser'
const ALL_USERS = 'users/allUsers'

// ACTION
const getUser = (user) => {
    return {
        type: GET_USER,
        payload: user
    }
}
const allUsers = (user) => {
    return {
        type: ALL_USERS,
        payload: user
    }
}

// THUNK

// Get user by ID
export const getUserBackend = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}`);
    const parsedRes = await res.json();
    dispatch(getUser(parsedRes))
}

export const allUsersBackend = () => async (dispatch) => {
    const res = await csrfFetch(`/api/session/all`);
    const parsedRes = await res.json();
    dispatch(allUsers(parsedRes))
}

const initialState = { LoggedUser: {}, User: {}, AllUsers: {} }
// REDUCER
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            const getUserState = { ...state }
            getUserState.User = action.payload
            return getUserState;
        case ALL_USERS:
            const allUsersState = { ...state }
            action.payload.forEach(user => {
                allUsersState.AllUsers[user.id] = user
            })
            return allUsersState;
        default:
            return { ...state }
    }
}

export default usersReducer;
