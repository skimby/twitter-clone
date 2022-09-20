import { csrfFetch } from "./csrf";

// TYPE
const CREATE_TWEET = 'tweets/createTweet';
const GET_FEED_TWEETS = 'tweets/getFeedTweets'

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

        default:
            return state;
    }
}

export default tweetsReducer;
