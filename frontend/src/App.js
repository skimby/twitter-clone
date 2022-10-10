import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage.js";
import SignupPage from "./components/SignupPage/index.js";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import UserProfile from "./components/UserProfile/index.js";
import PageNotFound from "./components/PageNotFound/index.js";
import Tweet from "./components/Tweet/index.js";
import ExplorePage from "./components/ExplorePage/index.js";
import WhoToFollow from "./components/WhoToFollow/index.js";
import UserFollows from "./components/UserFollows/index.js";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      <Switch>
        {!sessionUser && (
          <Route path='/' exact >
            <SignupPage />
          </Route>
        )}

        {sessionUser && (
          <>
            <div id='main-container'>
              <Navigation isLoaded={isLoaded} />

              <div className="mid-end-container">
                {isLoaded && (
                  <>
                    <Switch>
                      <>
                        <div className="middle-container">
                          <Route path='/' exact >
                            <HomePage />
                          </Route>

                          <Route path='/explore' exact >
                            <ExplorePage />
                          </Route>

                          <Route path='/:username/:userId' exact >
                            <UserProfile sessionUser={sessionUser} />
                          </Route>
                          <Route path='/:username/:userId/follows' exact >
                            <UserFollows />
                          </Route>
                          {/* <Route path='/:username/:userId/followers' exact >
                            <GetFollowersPage />
                          </Route> */}


                          <Route path='/:username/tweets/:tweetId' exact >
                            <Tweet />
                          </Route>

                          <Route>
                            <PageNotFound />
                          </Route>

                        </div>
                      </>
                    </Switch>

                    <div className='end-container'>
                      <Switch>
                        <Route path='/:username/:userId/follows'  >
                          <WhoToFollow />
                        </Route>
                        <WhoToFollow />
                      </Switch>
                    </div>

                  </>
                )}
              </div>
            </div>
          </>
        )}

        {/* {!sessionUser && (
        <SignupPage />
      )} */}




      </Switch>
    </>
  );
}

export default App;
