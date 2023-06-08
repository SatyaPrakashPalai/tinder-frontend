import React from "react";
import styles from "./chat-display.module.css";

function Chat({ descendingOrderMessages }) {
  return (
    <div className={styles["chat-display"]}>
      {descendingOrderMessages?.map((message, _index) => {
        return (
          <div key={_index}>
            <div className={styles["chat-message-header"]}>
              <div className={styles["img-container"]}>
                <img
                  style={{ width: "100%" }}
                  src={message.img}
                  alt={message.first_name + "profile"}
                />
              </div>
              <p>{message.name}</p>
            </div>
            <p>{message.message}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Chat;
