import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
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
      {!sessionUser && (
        <Switch>
          <Route path='/' exact >
            <SignupPage />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      )}

      {sessionUser && (
        <>
          <div id='main-container'>
            <Navigation isLoaded={isLoaded} />

            <div className="mid-end-container">
              {isLoaded && (
                <>
                  <div className="middle-container">
                    <>
                      <Switch>
                        <Route exact path='/'  >
                          <HomePage />
                        </Route>

                        <Route exact path='/explore' >
                          <ExplorePage />
                        </Route>

                        <Route exact path='/:username/:userId' >
                          <UserProfile sessionUser={sessionUser} />
                        </Route>

                        <Route exact path='/:username/:userId/follows' >
                          <UserFollows />
                        </Route>

                        <Route exact path='/:username/tweets/:tweetId' >
                          <Tweet />
                        </Route>

                        {/* <Route path='/:a'>
                            <Redirect to='/404' />
                          </Route>



                          <Route path="/404">
                            <PageNotFound />
                          </Route> */}

                        <Route>
                          <PageNotFound />
                        </Route>
                      </Switch>
                    </>
                  </div>

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
    </>
  );
}

export default App;
