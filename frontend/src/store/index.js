import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import tweetsReducer from "./tweet";
import usersReducer from "./user";
import commentsReducer from "./comment";
import followsReducer from "./follow";
import likesReducer from "./like";
import gifReducer from "./gif";
import retweetReducer from './retweet'

const rootReducer = combineReducers({
  session: sessionReducer,
  tweets: tweetsReducer,
  users: usersReducer,
  comments: commentsReducer,
  follows: followsReducer,
  likes: likesReducer,
  gifs: gifReducer,
  retweets: retweetReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
