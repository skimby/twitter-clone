import { csrfFetch } from "./csrf";

// TYPE
const LIKE = 'likes/like'
const UNLIKE = 'likes/unlike'
const GET_LIKES = 'likes/getLikes'
const GET_USER_LIKES = 'likes/getUserLikes'

// ACTION
const createLike = (like, isOwnPage) => {
    return {
        type: LIKE,
        payload: like,
        isOwnPage: isOwnPage
    }
}
const unlike = (like, isOwnPage) => {
    return {
        type: UNLIKE,
        payload: like,
        isOwnPage: isOwnPage
    }
}
const getLikes = (likes) => {
    return {
        type: GET_LIKES,
        payload: likes
    }
}
const getUserLikes = (likes, isOwnPage) => {
    return {
        type: GET_USER_LIKES,
        payload: likes,
        isOwnPage: isOwnPage
    }
}
// THUNK


// CREATE LIKES
export const createLikeBackend = (tweetId, isOwnPage) => async (dispatch) => {

    const res = await csrfFetch(`/api/likes/tweets/${tweetId}`, {
        method: "POST",
        body: JSON.stringify()
    });
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(createLike(parsedRes, isOwnPage));
    }
}

// DELETE LIKE
export const deleteLikeBackend = (tweetId, isOwnPage) => async (dispatch) => {
    const res = await csrfFetch(`/api/likes/tweets/${tweetId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(unlike(parsedRes, isOwnPage));
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
export const getUserLikesBackend = (userId, isOwnPage) => async (dispatch) => {
    const res = await csrfFetch(`/api/likes/users/${userId}`);
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(getUserLikes(parsedRes, isOwnPage));
    }
}

//REDUCER
const initialState = { tweet: {}, comment: {}, userLikes: {}, loggedUserLikes: {} }

const likesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIKES:
            const getLikesState = { ...state };
            getLikesState.tweet = {};
            action.payload.forEach(like => {
                getLikesState.tweet[like.id] = like;
            })
            return getLikesState;

        case GET_USER_LIKES:
            const getUserLikesState = { ...state };
            getUserLikesState.userLikes = {};
            getUserLikesState.loggedUserLikes = {};


            if (action.isOwnPage) {
                action.payload.forEach(like => {
                    getUserLikesState.loggedUserLikes[like.id] = like;
                })
            } else {
                action.payload.forEach(like => {
                    getUserLikesState.userLikes[like.id] = like;
                })
            }
            return getUserLikesState;

        case LIKE:
            const likeState = { ...state };
            likeState.loggedUserLikes[action.payload.id] = action.payload

            if (action.isOwnPage) {
                likeState.userLikes[action.payload.id] = action.payload
            }
            likeState.tweet[action.payload.id] = action.payload

            return likeState;

        case UNLIKE:
            const unLikeState = { ...state };
            delete unLikeState.loggedUserLikes[action.payload.id]

            if (!action.isOwnPage) {
                delete unLikeState.userLikes[action.payload.id]
            }
            delete unLikeState.tweet[action.payload.id]

            return unLikeState

        default:
            return state;
    }
}

export default likesReducer;
