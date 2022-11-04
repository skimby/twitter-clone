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
import Search from "./components/Search/index.js";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState()

  const sessionUser = useSelector(state => state.session?.user)

  useEffect(() => {
    if (sessionUser) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  })



  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      {!loggedIn && (
        <Switch>
          <Route path='/' exact >
            <SignupPage />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      )}

      {loggedIn && (
        <>
          <div id='main-container'>
            <Navigation isLoaded={isLoaded} />

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

                      <Route>
                        <PageNotFound />
                      </Route>
                    </Switch>
                  </>
                </div>

                <div className='end-container'>

                  <Search />

                  <Switch>
                    <Route path='/:username/:userId/follows'  >
                      <WhoToFollow />
                    </Route>
                    <WhoToFollow />
                  </Switch>

                  <div className='chirpette-info'>
                    <p className="gray-p">
                      <div className="my-icons">
                        Developed by Sally J Kim
                        <a href="https://www.linkedin.com/in/sallyjkim13/" target="_blank"><i className="pointer fa-brands fa-linkedin me"></i></a>

                        <a href="https://github.com/skimby" target="_blank">
                          <i className="pointer fa-brands fa-square-github me"></i>
                        </a>

                        <a href="http://www.sallyjkim.site/" target="_blank">
                          <i className="pointer fa-solid fa-envelope me"></i></a>
                      </div>
                      <br></br>
                    </p>

                    <p className="gray-p">
                      © Chirpette 2022
                    </p>
                  </div>

                </div>

              </>
            )}
          </div>

        </>
      )}
    </>
  );
}

export default App;
