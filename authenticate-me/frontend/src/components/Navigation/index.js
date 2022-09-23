import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import logo from '../../images/twitter-logo.png'
import CreateTweetModal from "../CreateTweetModal";
import UserSettingsModal from "./UserSettingsModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);




  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <>
      {/* <i className="fa-regular fa-user nav-icons"></i> */}
      <ProfileButton user={sessionUser} />
    </>;
  } else {
    console.log('hits')
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <ul className="nav-container">
      <li>
        <img src={logo} className='logo-container' />
      </li>
      <li>
        <NavLink exact to="/">
          <i className="fa-solid fa-house nav-icons"></i>
          <h3>Home</h3>
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/explore">
          <i className="fa-light fa-hashtag nav-icons"></i>
          <h3>Explore</h3>
        </NavLink>
      </li>
      <li>
        <i className="fa-regular fa-user nav-icons"></i>
        <ProfileButton user={sessionUser} />
      </li>
      <li>
        {isLoaded && sessionLinks}
      </li>
      <li>
        <CreateTweetModal />

      </li>
      <li>


        <div className='user-info-container' >
          <div className='profile-img'>
            <img className='profile-img' src={sessionUser?.user?.profileImage} />
          </div>

          <div className='user-info-content'>
            <div>
              <h5>{sessionUser?.user?.firstName}</h5>
              <h5>  <span className='thin-styling'>@{sessionUser?.user?.username}</span></h5>
            </div>

            <div>
              <UserSettingsModal />
            </div>

          </div>
        </div>
      </li>
    </ul >
  );
}

export default Navigation;
