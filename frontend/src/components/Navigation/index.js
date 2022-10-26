import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from '../../images/twitter-logo.png'
import CreateTweetModal from "../CreateTweetModal";
import CreateTweetModalMobile from "../CreateTweetModalMobile";
import UserSettingsModal from "./UserSettingsModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session);


  return (
    <>
      <div className="nav-container-desktop">
        <ul className="nav-ul">
          <li >
            <NavLink exact to="/" >
              <img src={logo} className='logo-container' alt='twitter logo' />
            </NavLink>
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


          <li >
            <CreateTweetModal />
          </li>

          <div id='footer'>
            <li>
              <div className='user-info-container'>
                <div className='profile-img'>
                  <img className='profile-img' alt='user page profile' src={sessionUser?.user?.profileImage} />
                </div>

                <div className='user-info-content2'>
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


      <div className="nav-container-mobile">
        <ul className="nav-ul-mobile">
          <li >
            <NavLink exact to="/" >
              <img src={logo} className='logo-container' alt='twitter logo' />
            </NavLink>
          </li>

          <li className='mobile-icons'>
            <div className='nav-icon-box-mobile'>
              <i className="fa-solid fa-house nav-icons"></i>
            </div>
            <NavLink exact to="/" activeClassName="active">
            </NavLink>
          </li>

          <li className='mobile-icons'>
            <div className='nav-icon-box-mobile'>
              <i className="fa-light fa-hashtag nav-icons1"></i>
            </div>

            <NavLink exact to="/explore" activeClassName='active'>
            </NavLink>
          </li>


          <li className='mobile-icons'>
            <div className='nav-icon-box-mobile'>
              <i className="fa-regular fa-user nav-icons"></i>
            </div>

            <NavLink exact to={`/${sessionUser?.user?.username}/${sessionUser?.user?.id}`} activeClassName='active'>
            </NavLink>
          </li>


          <li >
            <CreateTweetModalMobile />
          </li>

          <div id='footer-mobile'>
            <li>
              <div className='user-info-container-mobile'>
                <UserSettingsModal sessionUser={sessionUser} mobile='mobile' />
              </div>
            </li>
          </div>
        </ul >
      </div>
    </>
  );
}

export default Navigation;
