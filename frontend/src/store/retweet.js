import { csrfFetch } from "./csrf";

// TYPE
const RETWEET = 'retweets/retweet'
const DELETE_RETWEET = 'retweets/deleteRetweet'
const GET_RETWEETS = 'retweets/getretweets'
const GET_USER_RETWEETS = 'retweets/getUserRetweets'

// ACTION
const createRetweet = (retweet) => {
    return {
        type: RETWEET,
        payload: retweet
    }
}
const deleteRetweet = (retweet) => {
    return {
        type: DELETE_RETWEET,
        payload: retweet
    }
}
const getRetweets = (retweets) => {
    return {
        type: GET_RETWEETS,
        payload: retweets
    }
}
const getUserRetweets = (retweets, isOwnPage) => {
    return {
        type: GET_USER_RETWEETS,
        payload: retweets,
        isOwnPage: isOwnPage
    }
}
// THUNK
// CREATE RETWEET
export const createRetweetBackend = (tweetId, isOwnPage) => async (dispatch) => {

    const res = await csrfFetch(`/api/retweets/tweets/${tweetId}`, {
        method: "POST",
        body: JSON.stringify()
    });
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(createRetweet(parsedRes, isOwnPage));
    }
}

// // DELETE RETWEET
export const deleteRetweetBackend = (tweetId, retweetId, isOwnPage) => async (dispatch) => {
    const res = await csrfFetch(`/api/retweets/${retweetId}/tweets/${tweetId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(deleteRetweet(parsedRes, isOwnPage));
    }
}

// GET RETWEETS
export const getRetweetBackend = (tweetId) => async (dispatch) => {

    const res = await csrfFetch(`/api/retweets/tweets/${tweetId}`);

    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(getRetweets(parsedRes));
    }
}

// GET RETWEETS FOR USER
export const getUserRetweetsBackend = (userId, isOwnPage) => async (dispatch) => {
    const res = await csrfFetch(`/api/retweets/users/${userId}`);
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(getUserRetweets(parsedRes, isOwnPage));
    }
}


//REDUCER
const initialState = { tweets: {}, userRetweets: {}, loggedUserRetweets: {} }

const retweetReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RETWEETS:
            let getRetweetsState = { ...state };
            getRetweetsState.tweets = {};
            action.payload.forEach(retweet => {
                getRetweetsState.tweets[retweet.id] = retweet;
            })
            return getRetweetsState;

        case GET_USER_RETWEETS:
            const getUserRetweetsState = { ...state };
            getUserRetweetsState.userRetweets = {};
            getUserRetweetsState.loggedUserRetweets = {};


            if (action.isOwnPage) {
                action.payload.forEach(like => {
                    getUserRetweetsState.loggedUserRetweets[like.id] = like;
                })
            } else {
                action.payload.forEach(like => {
                    getUserRetweetsState.userRetweets[like.id] = like;
                })
            }
            return getUserRetweetsState;

        case RETWEET:
            const retweetState = { ...state };
            retweetState.loggedUserRetweets[action.payload.id] = action.payload

            retweetState.tweets[action.payload.id] = action.payload

            if (action.isOwnPage) {
                retweetState.userRetweets[action.payload.id] = action.payload
            }
            return retweetState;

        case DELETE_RETWEET:
            const deleteRetweetState = { ...state };
            if (action.isOwnPage) {
                delete deleteRetweetState.userRetweets[action.payload.id]
            }
            delete deleteRetweetState.loggedUserRetweets[action.payload.id]
            delete deleteRetweetState.tweets[action.payload.id]
            return deleteRetweetState;
        default:
            return state;
    }
}

export default retweetReducer;
