import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import logo from '../../images/twitter-logo.png'



function SignupForm({ setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const websitePrefix = 'https://'

  const sessionUser = useSelector((state) => state.session);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState(websitePrefix + "");
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      await dispatch(sessionActions.signup({
        firstName,
        lastName,
        username,
        bio,
        email,
        location,
        website,
        profileImage,
        coverImage,
        password
      }))
        .catch(async (res) => {
          const data = await res.json();
          console.log(data, data.errors)
          if (data.errors) {
            setErrors([data.errors])
          }
        });

      if (!errors.length) {

      }
    } else {
      return setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(file);
  };
  const updateFile2 = (e) => {
    const file = e.target.files[0];
    if (file) setCoverImage(file);
  };

  return (
    <>
      <div className="login-header">
        <div className="x-box" onClick={() => setShowModal(false)}>
          <i className="fa-solid fa-x"></i>
        </div>
        <div className="logo-box">
          <img src={logo} className='logo-container-module' />
        </div>
      </div>


      <h1 className="center-h1-signup">Create your account</h1>


      <div className="signup-modal-container">
        <form className='signup-form' onSubmit={handleSubmit}>

          <input className="half-input1"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            className="half-input"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <input
            className="signup-form-full-input"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="signup-form-full-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            className="signup-form-full-input"
            type="text"
            placeholder="Biography"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <input
            className="signup-form-full-input"
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            className="signup-form-full-input"
            type="text"
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />


          <label className="half-input1">
            Profile Image
            <input
              className="half-input1"
              type="file"
              onChange={updateFile}
              id='signupImg'
            />
            <i className="fa-solid fa-image-portrait signup"></i>
          </label>

          <label className="half-input">
            Cover Image
            <input
              className="half-input"
              type="file"
              onChange={updateFile2}
              id='coverImg'
            />
            <i className="fa-solid fa-users-between-lines signup"></i>
          </label>


          <input
            className="half-input1"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            className="half-input"
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Sign Up</button>
        </form>

        {errors && (
          <ul className="validation-errors-signup">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}

      </div>
    </>
  );
}

export default SignupForm;
