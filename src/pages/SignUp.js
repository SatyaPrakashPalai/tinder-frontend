import React, { useState } from "react";
import styles from "./signup.module.css";
import Navbar from "../components/UIEssentials/Navbar";
import AuthModal from "../components/Auth/AuthModal";
import { useCookies } from "react-cookie";

function SignUp() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [newUser, setNewUser] = useState(false);
  const authToken = cookies.AuthToken;
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const handleClick = () => {
    setNewUser(true);
    // console.log(newUser);
    setShowModal(true);
  };
  return (
    <div className={styles["overlay"]}>
      <Navbar setShowModal={setShowModal} setNewUser={setNewUser} />
      {/* <div className={styles["overlay"]}></div> */}
      <div className={styles["center"]}>
        <p className={styles["center_text"]}>Start something epic.</p>
        <button onClick={handleClick} className={styles["primary_button"]}>
          Create account
        </button>
      </div>
      {showModal && (
        <AuthModal
          setShowModal={setShowModal}
          newUser={newUser}
          isSignUp={isSignUp}
        />
      )}
    </div>
  );
}

export default SignUp;
