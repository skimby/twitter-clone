import { csrfFetch } from "./csrf";

// TYPE
const EDIT_COMMENT = 'tweets/editComment'
const DELETE_COMMENT = 'tweets/deleteComment'


// ACTION
const editTweet = (comment) => {
    return {
        type: EDIT_COMMENT,
        payload: comment
    }
}

const deleteTweet = (comment) => {
    return {
        type: DELETE_COMMENT,
        payload: comment
    }
}



// THUNK


// EDIT TWEET
export const editCommentBackend = (commentId, commentInput, tweetId) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}/tweets/${tweetId}`, {
        method: "PUT",
        body: JSON.stringify(commentInput)
    });
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(editTweet(parsedRes));
    }
}

// // DELETE TWEET
// export const deleteTweetBackend = (tweetId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/tweets/${tweetId}/delete`, {
//         method: 'DELETE'
//     });
//     if (res.ok) {
//         const parsedRes = await res.json();
//         dispatch(deleteTweet(parsedRes));
//     }
// }
// // GET TWEETS BY USER
// export const getTweetsUserBackend = (userId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/tweets/users/${userId}`);
//     const parsedRes = await res.json();
//     dispatch(getTweetsUser(parsedRes));
// }
// // GET TWEETS BY LOGGED USER
// export const getTweetsLoggedUserBackend = (userId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/tweets/users/${userId}`);
//     const parsedRes = await res.json();
//     dispatch(getTweetsLoggedUser(parsedRes));
// }

// // GET ONE TWEET
// export const getOneTweetBackend = (tweetId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/tweets/${tweetId}`);
//     const parsedRes = await res.json();
//     dispatch(getOneTweet(parsedRes));
// }


//REDUCER
const initialState = {}

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {

        case EDIT_COMMENT:
            const editCommentState = { ...state };

            editCommentState[action.payload.id] = action.payload

            return editCommentState;

        // case DELETE_TWEET:
        //     const deleteTweetState = { ...state };
        //     delete deleteTweetState.feedTweets[action.payload.id]
        //     delete deleteTweetState.exploreTweets[action.payload.id]
        //     delete deleteTweetState.loggedUserTweets[action.payload.id]

        //     return deleteTweetState;

        // case GET_TWEETS_USER:
        //     const getTweetsUser = { ...state }
        //     getTweetsUser.userTweets = {};
        //     action.payload.Tweets.forEach(tweet => {
        //         getTweetsUser.userTweets[tweet.id] = tweet
        //     })
        //     return getTweetsUser;
        // case GET_TWEETS_LOGGED_USER:
        //     const getTweetsLoggedUser = { ...state }
        //     action.payload.Tweets.forEach(tweet => {
        //         getTweetsLoggedUser.loggedUserTweets[tweet.id] = tweet
        //     })

        //     return getTweetsLoggedUser;
        // case GET_ONE_TWEET:
        //     const getOneTweet = { ...state };
        //     getOneTweet.currentTweet = action.payload.Tweet;
        //     return getOneTweet;
        default:
            return state;
    }
}

export default commentsReducer;
