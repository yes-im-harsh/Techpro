import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.config";

const Profile = () => {
  //Initializing
  const navigate = useNavigate();
  const auth = getAuth();
  console.log(auth);

  //formdata state
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const [changeDetails, setChangeDetails] = useState(false);

  //Destructuring it for data.
  const { name, email } = formData;

  //Logout Function
  const onLogout = (e) => {
    auth.signOut();
    navigate("/");
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      //Update in Firestore
      updateDoc(doc(db, "users", auth.currentUser.uid), {
        name,
      });
    } catch (error) {
      console.log("Could not update profile");
    }
  };

  return (
    <>
      <div className="profile">
        <header className="profileHeader">
          <p className="pageHeader">My Profile</p>
          <button type="button" className="logOut" onClick={onLogout}>
            Logout
          </button>

          <main>
            <div className="profileDetailsHeader">
              <p className="personalDetailsText">Personal Details</p>
              <p
                className="changePersonalDetails"
                onClick={() => {
                  setChangeDetails((prevState) => !prevState);

                  onSubmit();
                }}
              >
                {changeDetails ? "done" : "change"}
              </p>
            </div>

            <div className="profileCard">
              <form>
                <input
                  type="text"
                  id="name"
                  className={
                    !changeDetails ? "profileName" : "profileNameActive"
                  }
                  disabled={!changeDetails}
                  value={name}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  id="email"
                  className={
                    !changeDetails ? "profileEmail" : "profileEmailActive"
                  }
                  value={email}
                  disabled={!changeDetails}
                  onChange={handleChange}
                />
              </form>
            </div>
          </main>
        </header>
      </div>
    </>
  );
};

export default Profile;
