import { csrfFetch } from "./csrf";

// TYPE
const RETWEET = 'retweets/retweet'
const UNRETWEET = 'retweets/unretweet'
const GET_RETWEETS = 'retweets/getretweets'


// ACTION
const createRetweet = (retweet) => {
    return {
        type: RETWEET,
        payload: retweet
    }
}
const unRetweet = (retweet) => {
    return {
        type: UNRETWEET,
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

    const res = await csrfFetch(`/api/retweet/tweets/${tweetId}`, {
        method: "POST",
        body: JSON.stringify()
    });
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(createRetweet(parsedRes));
    }
}

// // DELETE RETWEET
// export const deleteLikeBackend = (tweetId, likeId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/likes/${likeId}/tweets/${tweetId}`, {
//         method: 'DELETE'
//     });
//     if (res.ok) {
//         const parsedRes = await res.json();
//         dispatch(unlike(parsedRes));
//     }
// }

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
            const getRetweetsState = { ...state };
            getRetweetsState = {};
            action.payload.forEach(retweet => {
                getRetweetsState[retweet.id] = retweet;
            })
            return getRetweetsState;

        case RETWEET:
            const retweetState = { ...state };
            retweetState[action.payload.tweetId] = action.payload

            return retweetState;
        // case UNLIKE:
        //     const unLikeState = { ...state };
        //     delete unLikeState.tweet[action.payload.tweetId]
        //     return unLikeState
        default:
            return state;
    }
}

export default retweetReducer;
