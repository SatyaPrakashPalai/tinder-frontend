import React, { useState } from "react";
import styles from "./chat-container.module.css";
import ChatHeader from "./ChatHeader";
import MatchesDisplay from "../Inbox/MatchesDisplay";
import ChatDisplay from "./ChatDisplay";
import InboxDisplay from "../Inbox/InboxDisplay";

function ChatContainer({ user, getUser }) {
  const [clickedUser, setClickedUser] = useState(null);
  const [display, setDisplay] = useState(false);

  const handleMatch = () => {
    setClickedUser(null);
    setDisplay(false);
    getUser();
  };

  const handleInbox = () => {
    setDisplay(!display);
    getUser();
  };
  // console.log(clickedUser);

  return (
    <div className={styles["chat-container"]}>
      <ChatHeader user={user} />
      <div>
        <button
          className={styles["option"]}
          onClick={handleMatch}
          // disabled={!display}
        >
          Matches
        </button>
        <button className={styles["option"]} disabled={!clickedUser}>
          Chat
        </button>
        <button
          className={styles["option"]}
          onClick={handleInbox}
          disabled={display}
        >
          Inbox
        </button>
      </div>

      {!display && !clickedUser && (
        <MatchesDisplay
          matches={user?.matches}
          setClickedUser={setClickedUser}
        />
      )}

      {!display && clickedUser && (
        <ChatDisplay user={user} clickedUser={clickedUser} />
      )}
      {display && (
        <InboxDisplay friends={user?.friend_requests} getUser={getUser} />
      )}
    </div>
  );
}

export default ChatContainer;
