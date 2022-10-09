import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import logo from '../../images/twitter-logo.png'
import CreateTweetModal from "../CreateTweetModal";
import UserSettingsModal from "./UserSettingsModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session);


  return (
    <div className="nav-container">
      <ul >
        <li >
          <img src={logo} className='logo-container' />
        </li>

        <li className="nav-grid">
          <div className='nav-icon-box'>
            <i className="fa-solid fa-house nav-icons"></i>
          </div>
          <h3>
            <NavLink exact to="/" activeClassName="active">
              Home
            </NavLink>
          </h3>

        </li>

        <li className="nav-grid">
          <div className='nav-icon-box'>
            <i className="fa-light fa-hashtag nav-icons1"></i>
          </div>

          <h3 className="nav1">
            <NavLink exact to="/explore" activeClassName='active'>
              Explore
            </NavLink>
          </h3>

        </li>


        <li className="nav-grid ">
          <div className='nav-icon-box'>
            <i className="fa-regular fa-user nav-icons"></i>
          </div>
          <h3>
            <NavLink exact to={`/${sessionUser?.user?.username}/${sessionUser?.user?.id}`} activeClassName='active'>
              Profile
            </NavLink>
          </h3>

        </li>


        <li>
          <CreateTweetModal />
        </li>

        <div id='footer'>
          <li>
            <div className='user-info-container'>
              <div className='profile-img'>
                <img className='profile-img' src={sessionUser?.user?.profileImage} />
              </div>

              <div className='user-info-content'>
                <div>
                  <h5>{sessionUser?.user?.firstName}</h5>
                  <h5>  <span className='thin-styling'>@{sessionUser?.user?.username}</span></h5>
                </div>

                <UserSettingsModal />
              </div>

            </div>
          </li>
        </div>
      </ul >
    </div>
  );
}

export default Navigation;
