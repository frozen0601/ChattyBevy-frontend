import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

const ChatPage = () => {
  let [messages, setMessages] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    getMessages();
  }, []);

  let getMessages = async () => {
    let response = await fetch("http://127.0.0.1:8000/messaging/room/1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setMessages(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  return (
    <div>
      <p>You are now in the chat page!</p>
      <ul>
        {messages.map((message) => (
          //   authTokens.username == room.user1 ?
          <li key={message.id}>
            Title: {message.title}
            <br />
            Body: {message.body}
            <br />
            Timestamp: {message.created_at}
          </li>
          //   <li key={message.id}>Body: {message.body}</li>
          //   <li key={message.id}>Timestamp: {message.created_at}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatPage;
