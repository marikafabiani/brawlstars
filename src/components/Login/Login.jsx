import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
//import ReactDOM from "react-dom";
import host from '../../constant'

import "./styles.css";
import { useEffect } from "react";
import { Box } from "@mui/material";

function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  // User Login info
  const database = [
    {
      username: "a",
      password: "a",
    },
    {
      username: "user2",
      password: "pass2",
    },
    {
      username: "user1",
      password: "pass1",
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    async function checkUser(username) {
      const response = await fetch(`${host}get_user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(username),
      });
      const r = await response.json();
      setIsLogged(r);
    }

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        checkUser(userData.username);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  useEffect(() => {
    if (isLogged) {
      navigate("/home");
    }
  },[isLogged, navigate]);

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          renderForm
        )}
      </div>
    </div>
  );
}

export default Login;
