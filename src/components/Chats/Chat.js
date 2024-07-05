import React from "react";
import styles from "./chat-display.module.css";
import Avatar from "../Utils/Avatar";

function Chat({ user, descendingOrderMessages }) {
  return (
    <div className={styles["chat-card"]}>
      <div className={styles["chat-header"]}>
        <div className={styles["h2"]}>{user.name}</div>
      </div>
      <div className={styles["chat-body"]}>
        {descendingOrderMessages?.map((message, _index) => {
          return (
            <div
              key={_index}
              className={`${styles["message"]} ${styles["incoming"]}`}
            >
              <Avatar user={message} />
              <p>{message.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Chat;
