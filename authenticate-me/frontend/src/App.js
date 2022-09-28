import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage.js";
import SignupPage from "./components/SignupPage/index.js";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import UserProfile from "./components/UserProfile/index.js";
import GetFollowsPage from "./components/GetFollowsPage/index.js";
import Tweet from "./components/Tweet/index.js";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const sessionUser = useSelector(state => state.session)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      {sessionUser?.user && (
        <div id='main-container'>
          <Navigation isLoaded={isLoaded} />

          {isLoaded && (
            <>
              <Switch>
                <>
                  <Route path='/' exact >
                    <HomePage />
                  </Route>

                  <Route path='/follows' exact >
                    <GetFollowsPage />
                  </Route>

                  <Route path='/:username' exact >
                    <UserProfile sessionUser={sessionUser?.user} />
                  </Route>

                  <Route path='/tweets/:tweetId' exact >
                    <Tweet />
                  </Route>
                </>
              </Switch>
            </>
          )}
        </div>
      )}

      {!sessionUser?.user && (
        <SignupPage />
      )}
    </>
  );
}

export default App;
