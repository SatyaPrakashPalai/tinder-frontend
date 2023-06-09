import React, { useEffect, useState } from "react";
import styles from "./inbox-display.module.css";
import Avatar from "./Avatar";
import { useCookies } from "react-cookie";
import axios from "axios";

function InboxDisplay() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [invites, setInvites] = useState(null);
  const userId = cookies.UserId;

  const getInvitedUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/invited-users", {
        params: { userId },
      });
      const foundUsers = response.data;
      setInvites(foundUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvitedUsers();
  }, []);
  return (
    <div className={styles["inbox-display"]}>
      {invites?.map((match, _index) => (
        <Avatar user={match} />
      ))}
    </div>
  );
}

export default InboxDisplay;
