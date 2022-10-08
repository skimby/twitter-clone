import { csrfFetch } from "./csrf";

// TYPE
const LIKE = 'likes/like'
const UNLIKE = 'likes/unlike'
const GET_LIKES = 'likes/getLikes'
const GET_USER_LIKES = 'likes/getUserLikes'
// const GET_LOGGED_USER_FOLLOWING = 'follow/getLoggedUserFollowing'
// const CREATE_FOLLOW = 'follow/createFollow'
// const DELETE_FOLLOW = 'follow/deleteFollow'


// ACTION
const createLike = (like) => {
    return {
        type: LIKE,
        payload: like
    }
}
const unlike = (like) => {
    return {
        type: UNLIKE,
        payload: like
    }
}
const getLikes = (likes) => {
    return {
        type: GET_LIKES,
        payload: likes
    }
}
const getUserLikes = (likes) => {
    return {
        type: GET_USER_LIKES,
        payload: likes
    }
}
// THUNK


// CREATE LIKES
export const createLikeBackend = (tweetId) => async (dispatch) => {

    const res = await csrfFetch(`/api/likes/tweets/${tweetId}`, {
        method: "POST",
        body: JSON.stringify()
    });
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(createLike(parsedRes));
    }
}

// DELETE LIKE
export const deleteLikeBackend = (tweetId, likeId) => async (dispatch) => {
    const res = await csrfFetch(`/api/likes/${likeId}/tweets/${tweetId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(unlike(parsedRes));
    }
}

// GET LIKES FOR TWEET
export const getLikesBackend = (tweetId) => async (dispatch) => {

    const res = await csrfFetch(`/api/likes/tweets/${tweetId}`);

    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(getLikes(parsedRes));
    }
}
// GET LIKES FOR USER
export const getUserLikesBackend = (userId) => async (dispatch) => {

    const res = await csrfFetch(`/api/likes/users/${userId}`);

    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(getUserLikes(parsedRes));
    }
}

//REDUCER
const initialState = { tweet: {}, comment: {} }

const likesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIKES:
            const getLikesState = { ...state };
            getLikesState.tweet = {};
            action.payload.forEach(like => {
                getLikesState.tweet[like.tweetId] = like;
            })
            return getLikesState;
        case GET_USER_LIKES:
            const getUserLikesState = { ...state };
            getUserLikesState.tweet = {};
            action.payload.forEach(like => {
                getUserLikesState.tweet[like.tweetId] = like;
            })
            return getUserLikesState;

        case LIKE:
            const likeState = { ...state };
            likeState.tweet[action.payload.tweetId] = action.payload

            return likeState;

        case UNLIKE:
            const unLikeState = { ...state };
            delete unLikeState.tweet[action.payload.tweetId]
            return unLikeState

        default:
            return state;
    }
}

export default likesReducer;
