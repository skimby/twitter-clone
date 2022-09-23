import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage.js";
import SignupPage from "./components/SignupPage/index.js";
import SignupFormModal from "./components/SignupFormModal";
import LoginFormModal from "./components/LoginFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState();

  const sessionUser = useSelector(state => state.session.user)

  console.log(sessionUser)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (sessionUser.length > 0) {
      setIsLoggedIn(true)
      console.log('is logged in')
    } else {
      setIsLoggedIn(false)
      console.log('is not logged in')
    }
  }, [])

  return (
    <>
      {isLoggedIn && (
        <div id='main-container'>
          <Navigation isLoaded={isLoaded} />

          {isLoaded && (
            <>
              <Switch>
                <>
                  <div id="middle-container">
                    <Route path='/' exact >
                      <HomePage />
                    </Route>
                  </div>
                </>
              </Switch>
            </>
          )}
        </div>
      )}

      {!isLoggedIn && (
        <SignupPage />
      )}
    </>
  );
}

export default App;
