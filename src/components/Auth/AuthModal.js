import React, { useState } from "react";
import styles from "./auth_modal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import authLogo from "../../images/tinder_logo.png";
import GoogleButton from "./GoogleButton";

function AuthModal({ setShowModal, newUser, isSignUp }) {
  return (
    <div className={styles["main-container"]}>
      <div className={styles["authmodal-wrapper"]}>
        <IconButton
          className={styles["close-button"]}
          onClick={() => {
            setShowModal(false);
          }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
        <div className={styles["form-image-wrapper"]}>
          <img style={{ width: "36px" }} src={authLogo} />
          <div className={styles["form-wrapper"]}>
            {newUser ? (
              <p className={styles["heading"]}>Create Account</p>
            ) : (
              <p className={styles["heading"]}>Get Started</p>
            )}

            <p className={styles["terms"]}>
              By clicking Log In, you agree to our Terms. Learn ow we process
              your data in our Privacy Policy and Cookie Policy.
            </p>
            <GoogleButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
