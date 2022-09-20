import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage.js";
import SignupFormModal from "./components/SignupFormModal";
import LoginFormModal from "./components/LoginFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div id='main-container'>

        <Navigation isLoaded={isLoaded} />
        {/* <Route path='/signup' exact >
        <SignupFormModal />
      </Route>
      <Route path='/login' exact >
        <LoginFormModal />
      </Route> */}
        {isLoaded && (
          <Switch>
            <div id="middle-container">
              <Route path='/' exact >
                <HomePage />
              </Route>
            </div>
          </Switch>
        )}
      </div>
    </>
  );
}

export default App;
