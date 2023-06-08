import React, { useState } from "react";
import styles from "./chat-container.module.css";
import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";

function ChatContainer({ user }) {
  const [clickedUser, setClickedUser] = useState(null);

  const handleMatch = () => {
    setClickedUser(null);
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
      </div>

      {!clickedUser && (
        <MatchesDisplay
          matches={user.matches}
          setClickedUser={setClickedUser}
        />
      )}

      {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
    </div>
  );
}

export default ChatContainer;
