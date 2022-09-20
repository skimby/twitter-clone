import { csrfFetch } from "./csrf";

// TYPE
const CREATE_TWEET = 'tweets/createTweet';

// ACTION
const createTweet = (tweet) => {
    return {
        type: CREATE_TWEET,
        payload: tweet
    }
}

// THUNK
export const createTweetBackend = (tweetInput) => async (dispatch) => {
    // const { tweet, gif, image } = tweetInput;
    console.log(tweetInput)
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

        default:
            return state;
    }
}

export default tweetsReducer;
