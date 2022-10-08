import { csrfFetch } from "./csrf";

// TYPE
const RETWEET = 'retweets/retweet'
const DELETE_RETWEET = 'retweets/deleteRetweet'
const GET_RETWEETS = 'retweets/getretweets'


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

// THUNK
// CREATE RETWEET
export const createRetweetBackend = (tweetId) => async (dispatch) => {

    const res = await csrfFetch(`/api/retweets/tweets/${tweetId}`, {
        method: "POST",
        body: JSON.stringify()
    });
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(createRetweet(parsedRes));
    }
}

// // DELETE RETWEET
export const deleteRetweetBackend = (tweetId, retweetId) => async (dispatch) => {
    const res = await csrfFetch(`/api/retweets/${retweetId}/tweets/${tweetId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(deleteRetweet(parsedRes));
    }
}

// GET LIKES
export const getRetweetBackend = (tweetId) => async (dispatch) => {

    const res = await csrfFetch(`/api/retweets/tweets/${tweetId}`);

    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(getRetweets(parsedRes));
    }
}


//REDUCER
const initialState = {}

const retweetReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RETWEETS:
            let getRetweetsState = { ...state };
            getRetweetsState = {};
            action.payload.forEach(retweet => {
                getRetweetsState[retweet.id] = retweet;
            })
            return getRetweetsState;

        case RETWEET:
            const retweetState = { ...state };
            retweetState[action.payload.tweetId] = action.payload

            return retweetState;
        case DELETE_RETWEET:
            const deleteRetweetState = { ...state };
            delete deleteRetweetState[action.payload.tweetId]
            return deleteRetweetState;
        default:
            return state;
    }
}

export default retweetReducer;
