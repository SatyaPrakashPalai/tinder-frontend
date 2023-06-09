import React from "react";
import styles from "./chat-header.module.css";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { IconButton } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function ChatHeader({ user }) {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const logout = () => {
    removeCookie("UserId", cookies.UserId);
    removeCookie("AuthToken", cookies.AuthToken);
    navigate("/signup");
    setTimeout(() => {
      window.location.reload();
    }, 0);
  };

  return (
    <div className={styles["chat-container-header"]}>
      <div className={styles["profile"]}>
        <div className={styles["img-container"]}>
          <img
            style={{ width: "100%" }}
            src={user?.url}
            alt={"photo of " + user?.first_name}
          />
        </div>
        <h3>{user?.first_name}</h3>
      </div>
      <IconButton onClick={logout}>
        <ExitToAppIcon fontSize="large" />
      </IconButton>
    </div>
  );
}

export default ChatHeader;
