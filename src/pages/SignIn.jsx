import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [fromData, setFromData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const params = useParams();
  console.log(params);

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = fromData;

  const handleChange = (e) => {
    setFromData({ ...fromData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredentials.user) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader"> Welcome Back!</p>
      </header>

      <form onSubmit={handleSubmit}>
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
            id="password"
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

      <OAuth />

      <Link to="/sign-up" className="registerLink">
        Sign Up Instead
      </Link>
    </div>
  );
};

export default SignIn;
