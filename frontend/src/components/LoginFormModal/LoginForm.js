import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./LoginForm.css";
import logo from '../../images/twitter-logo.png'


function LoginForm({ setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    await dispatch(sessionActions.login({ username, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const signUpLink = () => {
    //update this later
    history.go()
  }

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

      <h1 className="center-h1">Sign in to Twitter</h1>

      <div className="login-form-container">

        <form className="login-form" onSubmit={handleSubmit}>

          <input
            type="text"
            value={username}
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />


          <button className='login-btn-styling' type="submit">Log In</button>
        </form>

        <ul className="validation-errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>

        <p className="gray-p">Don't have an account? <span className='link-styling' onClick={signUpLink}>Sign up</span></p>
      </div>
    </>
  );
}

export default LoginForm;
