import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import axios from "axios";

function ChatDisplay({ user, clickedUser }) {
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;
  const [usersMessages, setUsersMessages] = useState(null);
  const [clickedUsersMessages, setClickedUsersMessages] = useState(null);

  const getUsersMessages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/messages", {
        params: { userId: userId, correspondingUserId: clickedUserId },
      });
      setUsersMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getClickedUsersMessages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/messages", {
        params: { userId: clickedUserId, correspondingUserId: userId },
      });
      setClickedUsersMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersMessages();
    getClickedUsersMessages();

    // Fetch messages every 5 seconds
    const interval = setInterval(() => {
      getUsersMessages();
      getClickedUsersMessages();
    }, 50);

    // Clean up the interval when component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  console.log(usersMessages);
  console.log(clickedUsersMessages);

  const messages = [];

  usersMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["first_name"] = user?.first_name;
    formattedMessage["url"] = user?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.timestamp;
    messages.push(formattedMessage);
  });

  clickedUsersMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["first_name"] = clickedUser?.first_name;
    formattedMessage["url"] = clickedUser?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.timestamp;
    messages.push(formattedMessage);
  });

  const descendingOrderMessages = messages?.sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp)
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Chat
        user={user}
        clickedUser={clickedUser}
        descendingOrderMessages={descendingOrderMessages}
      />
      <ChatInput
        user={user}
        clickedUser={clickedUser}
        getUsersMessages={getUsersMessages}
        getClickedUserMessages={getClickedUsersMessages}
      />
    </div>
  );
}

export default ChatDisplay;
