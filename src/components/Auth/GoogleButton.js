import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import styles from "./google-button.module.css";
import googleIcon from "../../images/google.svg";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import config from "../../config";

function GoogleButton() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const handleLogin = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // console.log(result);
        const email = result.user.email;
        const userId = result.user.uid;
        const token = (await result.user.getIdTokenResult()).token;
        const response = await axios.post(`${config.apiUrl}/users/signup`, {
          token,
          email,
          userId,
        });

        setCookie("Email", email);
        setCookie("UserId", userId);
        setCookie("AuthToken", token);

        console.log(response);
        const success = response.status === 201;
        console.log(success);
        success ? navigate("/onboarding") : navigate("/");
        window.location.reload();
      })

      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className={styles["button-wrapper"]} onClick={handleLogin}>
      <div className={styles["icon-wrapper"]}>
        <img className={styles["google-icon"]} src={googleIcon} />
      </div>
      <p className={styles["button-text"]}>Continue with Google</p>
    </div>
  );
}

export default GoogleButton;
