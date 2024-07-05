import React, { useEffect, useState } from "react";
import styles from "./inbox-display.module.css";
import Avatar from "../Utils/Avatar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useCookies } from "react-cookie";
import axios from "axios";
import { IconButton } from "@mui/material";
import config from "../../config";

function InboxDisplay({ friends, getUser }) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [invites, setInvites] = useState(null);
  const userId = cookies.UserId;
  const friendUserIds = friends?.map(({ user_id }) => user_id);

  const getInvitedUsers = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/users/inviteusers`, {
        params: { userIds: JSON.stringify(friendUserIds) },
      });
      console.log("resposnse", response.data);
      setInvites(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async (addFriend) => {
    setInvites((prevInvites) =>
      prevInvites.filter((invite) => invite.user_id !== addFriend)
    );
    try {
      const response = await axios.put(`${config.apiUrl}/users/addmatch`, {
        userId: userId,
        friendId: addFriend,
      });
      // Remove the invite from the state

      console.log("in invite", invites);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (addFriend) => {
    setInvites((prevInvites) =>
      prevInvites.filter((invite) => invite.user_id !== addFriend)
    );
    try {
      const response = await axios.put(`${config.apiUrl}/users/removerequest`, {
        userId: userId,
        friendId: addFriend,
      });
      // Remove the invite from the state

      console.log("in invite", invites);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("invite", invites);

  useEffect(() => {
    getInvitedUsers();
  }, []);

  return (
    <div className={styles["inbox-display"]}>
      {invites ? (
        invites?.map((match, _index) => (
          <div key={match.user_id} className={styles["friend-request"]}>
            <Avatar user={match} />
            <div className={styles["button-contianer"]}>
              <IconButton
                onClick={() => {
                  handleAdd(match.user_id);
                  getUser();
                }}
              >
                <CheckCircleIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleRemove(match.user_id);
                  getUser();
                }}
              >
                <CancelIcon />
              </IconButton>
            </div>
          </div>
        ))
      ) : (
        <h3 style={{ textAlign: "center" }}>Empty</h3>
      )}
    </div>
  );
}

export default InboxDisplay;
