import React, { useState } from "react";
import axios from "axios";
import styles from "./chat-display.module.css";

function ChatInput({
  user,
  clickedUser,
  getUsersMessages,
  getClickedUserMessages,
}) {
  const [textArea, setTextArea] = useState("");
  const userId = user?.user_id;
  const clickUserId = clickedUser?.user_id;

  const addMessage = async () => {
    const message = {
      timestamp: new Date().toISOString(),
      from_userId: userId,
      to_userId: clickUserId,
      message: textArea,
    };
    try {
      await axios.post("http://localhost:8000/message", {
        message,
      });
      getUsersMessages();
      getClickedUserMessages();
      setTextArea("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles["chat-input"]}>
      <textarea
        value={textArea}
        onChange={(e) => {
          setTextArea(e.target.value);
        }}
      />
      <button className={styles["secondary-button"]} onClick={addMessage}>
        submit
      </button>
    </div>
  );
}

export default ChatInput;
