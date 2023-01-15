import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import googleIcon from "../assets/svg/googleIcon.svg";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";

const OAuth = () => {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      //checking for users
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      //If user doesn't exists create user
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === "/sign-up" ? "up" : "in"} with</p>
      <button className="socialIconDiv" onClick={handleClick}>
        <img className="socialIconImg" src={googleIcon} alt="Google-Icon" />
      </button>
    </div>
  );
};

export default OAuth;
