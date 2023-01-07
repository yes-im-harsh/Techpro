import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

const SignIn = () => {
  const [fromData, setFromData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = fromData;

  const handleChange = (e) => {
    setFromData({ ...FormData, [e.target.id]: e.target.value });
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader"> Welcome Back!</p>
      </header>

      <form>
        <input
          type="email"
          className="emailInput"
          placeholder="Email"
          id="email"
          value={email}
          onChange={handleChange}
        />
        <div className="passwordInputDiv">
          <input
            className="passwordInput"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleChange}
          />
          <img
            src={visibilityIcon}
            alt="eye"
            className="showPassword"
            onClick={() => setShowPassword((prevState) => !prevState)}
          />
        </div>

        <Link className="forgotPasswordLink" to="/forgot-password">
          Forgot Password
        </Link>

        <div className="signInBar">
          <p className="signInText">Sign In</p>
          <button className="signInButton">
            <ArrowRightIcon width="32px" height="32px" fill="#ffffff" />
          </button>
        </div>
      </form>

      {/* Todo: GoogleOAuth */}
      <Link to="/sign-up" className="registerLink">
        Sign Up Instead
      </Link>
    </div>
  );
};

export default SignIn;
