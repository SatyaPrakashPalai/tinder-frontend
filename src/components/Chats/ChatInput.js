import React, { useState } from "react";
import axios from "axios";
import styles from "./chat-display.module.css";
import config from "../../config";

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
    if (!textArea.trim()) {
      return; // Do not send empty messages
    }

    const message = {
      timestamp: new Date().toISOString(),
      from_userId: userId,
      to_userId: clickUserId,
      message: textArea,
    };

    try {
      await axios.post(`${config.apiUrl}/chat/message`, { message });
      getUsersMessages();
      getClickedUserMessages();
      setTextArea("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents the default behavior of pressing Enter (e.g., new line)
      addMessage();
    }
  };

  return (
    <div className={styles["chat-footer"]}>
      <input
        placeholder="Type your message"
        type="text"
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={addMessage}>Send</button>
    </div>
  );
}

export default ChatInput;
