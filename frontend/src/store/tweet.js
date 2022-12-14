import { csrfFetch } from "./csrf";

// TYPE
const CREATE_TWEET = 'tweets/createTweet';
const GET_FEED_TWEETS = 'tweets/getFeedTweets'
const EDIT_TWEET = 'tweets/editTweet'
const DELETE_TWEET = 'tweets/deleteTweet'
const GET_TWEETS_USER = 'tweets/getTweetsUser'
const GET_TWEETS_LOGGED_USER = 'tweets/getTweetsLoggedUser'
const GET_ONE_TWEET = 'tweets/getOneTweet'
const GET_EXPLORE_TWEETS = 'tweets/getExploreTweets'
const GET_LIKED_TWEETS = 'tweets/getLikedTweets'
const GET_USER_RETWEETS = 'tweets/getUserRetweets'


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
        type: DELETE_TWEET,
        payload: tweet
    }
}

const getTweetsUser = (tweets) => {
    return {
        type: GET_TWEETS_USER,
        payload: tweets
    }
}

const getTweetsLoggedUser = (tweets) => {
    return {
        type: GET_TWEETS_LOGGED_USER,
        payload: tweets
    }
}
const getOneTweet = (tweet) => {
    return {
        type: GET_ONE_TWEET,
        payload: tweet
    }
}

const getExploreTweets = (tweets) => {
    return {
        type: GET_EXPLORE_TWEETS,
        payload: tweets
    }
}

const getLikedTweets = (tweets, isOwnPage) => {
    return {
        type: GET_LIKED_TWEETS,
        payload: tweets,
        isOwnPage
    }
}

const getUserRetweets = (tweets, isOwnPage) => {
    return {
        type: GET_USER_RETWEETS,
        payload: tweets,
        isOwnPage
    }
}
// THUNK
export const createTweetBackend = (tweetInput) => async (dispatch) => {
    const { tweet, image, gif } = tweetInput;


    const formData = new FormData();
    formData.append("tweet", tweet);

    if (gif) formData.append("gif", gif);
    if (image) formData.append("image", image);

    const res = await csrfFetch('/api/tweets/create', {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData
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
        return parsedRes;
    }
}

// DELETE TWEET
export const deleteTweetBackend = (tweetId) => async (dispatch) => {
    const res = await csrfFetch(`/api/tweets/${tweetId}/delete`, {
        method: 'DELETE'
    });
    if (res.ok) {
        const parsedRes = await res.json();
        dispatch(deleteTweet(parsedRes));
    }
}
// GET TWEETS BY USER
export const getTweetsUserBackend = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/tweets/users/${userId}`);
    const parsedRes = await res.json();
    dispatch(getTweetsUser(parsedRes));
}
// GET TWEETS BY LOGGED USER
export const getTweetsLoggedUserBackend = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/tweets/users/${userId}`);
    const parsedRes = await res.json();
    dispatch(getTweetsLoggedUser(parsedRes));
}

// GET ONE TWEET
export const getOneTweetBackend = (tweetId) => async (dispatch) => {
    const res = await csrfFetch(`/api/tweets/${tweetId}`);
    const parsedRes = await res.json();
    dispatch(getOneTweet(parsedRes));
}

// GET EXPLORE TWEETS
export const getExploreTweetsBackend = () => async (dispatch) => {
    const res = await csrfFetch(`/api/tweets/explore`);
    const parsedRes = await res.json();
    dispatch(getExploreTweets(parsedRes));
}

// GET LIKED TWEETS
export const getLikedTweetsBackend = (userId, isOwnPage) => async (dispatch) => {
    const res = await csrfFetch(`/api/tweets/users/${userId}/likes`);
    const parsedRes = await res.json();
    dispatch(getLikedTweets(parsedRes, isOwnPage));
}

// GET USER REWEETS
export const getRetweetsBackend = (userId, isOwnPage) => async (dispatch) => {
    const res = await csrfFetch(`/api/tweets/users/${userId}/retweets`);
    const parsedRes = await res.json();
    dispatch(getUserRetweets(parsedRes, isOwnPage));
}


//REDUCER
const initialState = { feedTweets: {}, exploreTweets: {}, loggedUserTweets: {}, userTweets: {}, currentTweet: {}, likedTweets: {}, loggedUserLikedTweet: {}, retweets: {}, loggedUserRetweets: {} }

const tweetsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TWEET:
            const createTweetState = { ...state };
            createTweetState.feedTweets[action.payload.id] = action.payload;
            createTweetState.exploreTweets[action.payload.id] = action.payload;
            createTweetState.loggedUserTweets[action.payload.id] = action.payload;
            return createTweetState;

        case GET_FEED_TWEETS:
            const getFeedTweetsState = { ...state };
            getFeedTweetsState.feedTweets = {};
            // getFeedTweetsState.currentTweet = {};
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

        case GET_TWEETS_USER:
            const getTweetsUser = { ...state }
            getTweetsUser.userTweets = {};
            action.payload.Tweets.forEach(tweet => {
                getTweetsUser.userTweets[tweet.id] = tweet
            })

            return getTweetsUser;
        case GET_TWEETS_LOGGED_USER:
            const getTweetsLoggedUser = { ...state }
            getTweetsLoggedUser.loggedUserTweets = {};
            action.payload.Tweets.forEach(tweet => {
                getTweetsLoggedUser.loggedUserTweets[tweet.id] = tweet
            })
            return getTweetsLoggedUser;
        case GET_ONE_TWEET:
            const getOneTweet = { ...state };
            getOneTweet.currentTweet = action.payload.Tweet;
            return getOneTweet;

        case GET_EXPLORE_TWEETS:
            const getExploreTweetsState = { ...state };
            getExploreTweetsState.exploreTweets = {}
            action.payload.Tweets.forEach(tweet => {
                getExploreTweetsState.exploreTweets[tweet.id] = tweet
            })

            return getExploreTweetsState;
        case GET_LIKED_TWEETS:
            const getLikedTweetState = { ...state };

            if (action.isOwnPage) {
                getLikedTweetState.loggedUserLikedTweets = {}
                action.payload.map(tweet => {
                    getLikedTweetState.loggedUserLikedTweets[tweet.id] = tweet
                })
            }
            if (!action.isOwnPage) {
                getLikedTweetState.likedTweets = {}
                action.payload.map(tweet => {
                    getLikedTweetState.likedTweets[tweet.id] = tweet
                })
            }
            return getLikedTweetState;
        case GET_USER_RETWEETS:
            const getUserRetweetsState = { ...state };

            if (action.isOwnPage) {
                getUserRetweetsState.loggedUserRetweets = {}
                action.payload.map(tweet => {
                    getUserRetweetsState.loggedUserRetweets[tweet.id] = tweet
                })
            }
            if (!action.isOwnPage) {
                getUserRetweetsState.retweets = {}
                action.payload.map(tweet => {
                    getUserRetweetsState.retweets[tweet.id] = tweet
                })
            }
            return getUserRetweetsState;
        default:
            return state;
    }
}

export default tweetsReducer;
