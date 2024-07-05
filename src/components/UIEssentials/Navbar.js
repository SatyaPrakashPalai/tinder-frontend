import styles from "./navbar.module.css";
import whiteLogo from "../../images/tinder_logo_white.png";
import colorLogo from "../../images/color-logo-tinder.png";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

function Navbar({ setShowModal, setNewUser, minimal }) {
  const authToken = true;
  const [display, setDisplay] = useState("none");
  const handleClick = () => {
    if (display === "none") {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
    console.log(display);
  };
  const handleLogin = () => {
    setShowModal(true);
    setNewUser(false);
  };

  return (
    <nav
      style={{
        // overflow: "hidden",
        maxWidth: "100vw",
        maxHeight: "100vh",
      }}
    >
      <div className={`${styles["navbar"]} ${!minimal && styles["shadow"]}`}>
        <div className={styles["left-part"]}>
          <img
            className={styles["logo-container"]}
            src={minimal ? colorLogo : whiteLogo}
            alt="logo"
          />
          <div
            style={minimal ? { display: "none" } : { display: "inline-flex" }}
            className={styles["list"]}
          >
            <p>Products</p>
            <p>Learn</p>
            <p>Safety</p>
            <p>Support</p>
            <p>Download</p>
          </div>
        </div>
        <div className={styles["right-part"]}>
          <p>Languages</p>
          <button className={styles["primary-button"]} onClick={handleLogin}>
            Log in
          </button>
        </div>
      </div>
      <div className={styles["mobile-navbar"]}>
        <img className={styles["logo-container"]} src={whiteLogo} alt="logo" />
        <IconButton onClick={handleClick}>
          <MenuIcon style={{ color: "white" }} />
        </IconButton>
      </div>
      <div className={`${styles["burger-navbar"]} ${styles[`${display}`]}`}>
        <div className={styles["logo-close-wrapper"]}>
          <img className={styles["logo-container"]} src={colorLogo} alt="" />
          <IconButton onClick={handleClick}>
            <CloseIcon color="action" fontSize="large" />
          </IconButton>
        </div>
        <ul>
          <li>Products</li>
          <li>Learn</li>
          <li>Safety</li>
          <li>Support</li>
          <li>Download</li>
        </ul>
        <button className={styles["primary-button"]}>Log in</button>
      </div>
    </nav>
  );
}

export default Navbar;
