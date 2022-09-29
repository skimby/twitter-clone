import { csrfFetch } from "./csrf";


// TYPE
const GET_USER = 'users/getUser'

// ACTION
const getUser = (user) => {
    return {
        type: GET_USER,
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



const initialState = { LoggedUser: {}, User: {} }
// REDUCER
const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_USER:
            const getUserState = { ...state }
            getUserState.User = action.payload
            return getUserState;
        default:
            return { ...state }
    }
}

export default usersReducer;
