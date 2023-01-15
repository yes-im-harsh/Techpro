import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config.js";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(userCredentials.user);

      const user = userCredentials.user;

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      console.log("user Registered");
      navigate("/");
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
          type="text"
          className="nameInput"
          placeholder="Name"
          id="name"
          value={name}
          onChange={handleChange}
        />
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
          <p className="signInText">Sign Up</p>
          <button type="submit" className="signInButton">
            <ArrowRightIcon width="32px" height="32px" fill="#ffffff" />
          </button>
        </div>
      </form>

      <OAuth />
      <Link to="/sign-in" className="registerLink">
        Sign In Instead
      </Link>
    </div>
  );
};

export default SignUp;
