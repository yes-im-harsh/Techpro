import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  // const [user, setUser] = useState(null);
  // const auth = getAuth();

  // useEffect(() => {
  //   setUser(auth.currentUser);
  // }, [auth.currentUser]);
  // return user ? <h1>{user.displayName}</h1> : <h2>Not Logged In</h2>;

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const auth = getAuth();

  // useEffect(() => {
  //   setUser(auth.currentUser);
  // }, [auth.currentUser]);

  // const onLogout = () => {
  //   auth.signOut();
  // };
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData; //Destructuring it for data.

  const onLogout = (e) => {
    auth.signOut();
    navigate("/");
  };

  return (
    <>
      <div className="profile">
        <header className="profileHeader">
          <p className="pageHeader">My Profile</p>
          <button type="button" className="logOut" onClick={onLogout}>
            Logout
          </button>
        </header>
      </div>
    </>
  );
};

export default Profile;
