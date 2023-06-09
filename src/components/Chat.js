import React from "react";
import styles from "./chat-display.module.css";
import Avatar from "./Avatar";

function Chat({ user, descendingOrderMessages }) {
  return (
    <div className={styles["chat-display"]}>
      {descendingOrderMessages?.map((message, _index) => {
        return (
          <div key={_index} className={styles["message-card"]}>
            <Avatar user={message} />
            <p>{message.message}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Chat;
