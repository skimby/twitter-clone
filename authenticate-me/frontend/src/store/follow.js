import { csrfFetch } from "./csrf";

// TYPE
const GET_FOLLOWING = 'follow/getFollowing'
const GET_FOLLOWERS = 'follow/getFollowers'
const GET_LOGGED_USER_FOLLOWING = 'follow/getLoggedUserFollowing'
const CREATE_FOLLOW = 'follow/createFollow'
const DELETE_FOLLOW = 'follow/deleteFollow'


// ACTION
const getFollowing = (follows, isOwnPage) => {
    return {
        type: GET_FOLLOWING,
        payload: follows,
        isOwnPage: isOwnPage
    }
}
const getFollowers = (follows, isOwnPage) => {
    return {
        type: GET_FOLLOWERS,
        payload: follows,
        isOwnPage: isOwnPage
    }
}
const getLoggedUserFollowing = (follows) => {
    return {
        type: GET_LOGGED_USER_FOLLOWING,
        payload: follows
    }
}
const createFollow = (follow, userId) => {
    return {
        type: CREATE_FOLLOW,
        payload: follow,
        userId: userId
    }
}
// const editComment = (comment) => {
//     return {
//         type: EDIT_COMMENT,
//         payload: comment
//     }
// }

const deleteFollow = (follow, userId, isOwnPage) => {
    return {
        type: DELETE_FOLLOW,
        payload: follow,
        userId: userId,
        isOwnPage: isOwnPage
    }
}

// THUNK

// GET FOLLOWING
export const getFollowingBackend = (userId, isOwnPage) => async (dispatch) => {

    const res = await csrfFetch(`/api/follows/users/${userId}/following`);

    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(getFollowing(parsedRes, isOwnPage));
    }
}

// GET FOLLOWING
export const getFollowersBackend = (userId, isOwnPage) => async (dispatch) => {

    const res = await csrfFetch(`/api/follows/users/${userId}/followers`);

    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(getFollowers(parsedRes, isOwnPage));
    }
}

// GET LOGGED USER FOLLOWING
export const getLoggedUserFollowingBackend = () => async (dispatch) => {

    const res = await csrfFetch(`/api/follows/users/me`);

    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(getLoggedUserFollowing(parsedRes));
    }
}

// CREATE FOLLOW
export const createFollowBackend = (userId, userPageId) => async (dispatch) => {

    const res = await csrfFetch(`/api/follows/users/${userPageId}/follow`, {
        method: "POST",
        body: JSON.stringify({
            userId: userId,
            followerId: parseInt(userPageId)
        })
    });
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(createFollow(parsedRes, userId));
    }
}
// DELETE TWEET
export const deleteFollowBackend = (userId, userPageId, isOwnPage) => async (dispatch) => {
    const res = await csrfFetch(`/api/follows/users/${userPageId}/unfollow`, {
        method: 'DELETE'
    });
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(deleteFollow(parsedRes, userId, isOwnPage));
    }
}



//REDUCER
const initialState = { following: {}, followers: {}, loggedUserFollowing: {} }

const followsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FOLLOWING:
            const getFollowingState = { ...state };
            getFollowingState.following = {};
            action.payload.Following.forEach(follow => {
                getFollowingState.following[follow.id] = follow;
            })
            return getFollowingState;

        case GET_FOLLOWERS:
            const getFollowersState = { ...state };
            getFollowersState.followers = {};
            action.payload.Following.forEach(follow => {
                getFollowersState.followers[follow.id] = follow;
            })
            return getFollowersState;

        case GET_LOGGED_USER_FOLLOWING:
            const getLoggedUserFollowingState = { ...state };
            action.payload.LoggedUserFollowing.forEach(follow => {
                getLoggedUserFollowingState.loggedUserFollowing[follow.id] = follow;
            })
            return getLoggedUserFollowingState;

        case CREATE_FOLLOW:
            const createFollowState = { ...state };
            createFollowState.loggedUserFollowing[action.payload.id] = action.payload

            if (action.isOwnPage) {
                createFollowState.following[action.payload.id] = action.payload
            }

            return createFollowState;

        case DELETE_FOLLOW:
            const deleteFollowState = { ...state };
            delete deleteFollowState.loggedUserFollowing[action.payload.id]

            if (action.isOwnPage) {
                delete deleteFollowState.following[action.payload.id]
            }
            return deleteFollowState;

        default:
            return state;
    }
}

export default followsReducer;
