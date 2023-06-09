import React, { useState } from "react";
import styles from "./chat-container.module.css";
import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";
import InboxDisplay from "./InboxDisplay";

function ChatContainer({ user }) {
  const [clickedUser, setClickedUser] = useState(null);
  const [display, setDisplay] = useState(false);

  const handleMatch = () => {
    setClickedUser(null);
    setDisplay(false);
  };

  const handleInbox = () => {
    setDisplay(!display);
  };
  // console.log(clickedUser);

  return (
    <div className={styles["chat-container"]}>
      <ChatHeader user={user} />
      <div>
        <button className={styles["option"]} onClick={handleMatch}>
          Matches
        </button>
        <button className={styles["option"]} disabled={!clickedUser}>
          Chat
        </button>
        <button className={styles["option"]} onClick={handleInbox}>
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
      {display && <InboxDisplay />}
    </div>
  );
}

export default ChatContainer;
