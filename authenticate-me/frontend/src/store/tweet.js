import { csrfFetch } from "./csrf";

// TYPE
const CREATE_TWEET = 'tweets/createTweet';
const GET_FEED_TWEETS = 'tweets/getFeedTweets'
const EDIT_TWEET = 'tweets/editTweet'
const DELETE_TWEET = 'tweets/deleteTweet'

// ACTION
const createTweet = (tweet) => {
    return {
        type: CREATE_TWEET,
        payload: tweet
    }
}

const getFeedTweets = (tweets) => {
    return {
        type: GET_FEED_TWEETS,
        payload: tweets
    }
}

const editTweet = (tweet) => {
    return {
        type: EDIT_TWEET,
        payload: tweet
    }
}

const deleteTweet = (tweet) => {
    return {
        type: EDIT_TWEET,
        payload: tweet
    }
}

// THUNK
export const createTweetBackend = (tweetInput) => async (dispatch) => {
    const res = await csrfFetch('/api/tweets/create', {
        method: "POST",
        body: JSON.stringify(tweetInput)
    });

    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(createTweet(parsedRes));
        return parsedRes;
    }
}

// GET FEED TWEETS
export const getFeedTweetsBackend = () => async (dispatch) => {
    const res = await csrfFetch('/api/tweets/feed');
    const parsedRes = await res.json();
    dispatch(getFeedTweets(parsedRes));
}

// EDIT TWEET
export const editTweetBackend = (tweetId, tweetEdit) => async (dispatch) => {
    const res = await csrfFetch(`/api/tweets/${tweetId}`, {
        method: "PUT",
        body: JSON.stringify(tweetEdit)
    });
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(editTweet(parsedRes));
    }
}

// DELETE TWEET
export const deleteTweetBackend = (tweetId) => async (dispatch) => {
    console.log(tweetId)
    const res = await csrfFetch(`/api/tweets/${tweetId}/delete`, {
        method: 'DELETE'
    });
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(deleteTweet(parsedRes));
    }
}

//REDUCER
const initialState = { feedTweets: {}, exploreTweets: {}, loggedUserTweets: {}, userTweets: {} }

const tweetsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TWEET:
            const createTweetState = { ...state };
            createTweetState.feedTweets = action.payload;
            createTweetState.exploreTweets = action.payload;
            createTweetState.loggedUserTweets = action.payload;
            return createTweetState;

        case GET_FEED_TWEETS:
            const getFeedTweetsState = { ...state };
            action.payload.Tweets.forEach(tweet => {
                getFeedTweetsState.feedTweets[tweet.id] = tweet
            });
            return getFeedTweetsState;

        case EDIT_TWEET:
            const editTweetState = { ...state };
            editTweetState.feedTweets[action.payload.id] = action.payload;
            editTweetState.exploreTweets[action.payload.id] = action.payload;
            editTweetState.loggedUserTweets[action.payload.id] = action.payload;
            return editTweetState;

        case DELETE_TWEET:
            const deleteTweetState = { ...state };
            delete deleteTweetState.feedTweets[action.payload.id]
            delete deleteTweetState.exploreTweets[action.payload.id]
            delete deleteTweetState.loggedUserTweets[action.payload.id]

            return deleteTweetState;
        default:
            return state;
    }
}

export default tweetsReducer;
