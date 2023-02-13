import React, { useState, useEffect, useContext, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
const messageBoxStyle = {
  color: "black",
  backgroundColor: "Cyan",
};

function ScrollToBottom() {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
}

const ChatPage = () => {
  let [messages, setMessages] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    getMessages();
  }, []);

  function deleteMessage(messageID) {
    fetch("http://127.0.0.1:8000/messaging/room/1/message/" + messageID + "/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + String(authTokens.access),
      },
      body: "",
    }).then(() => {
      console.log("message deleted.");
      window.location.reload(false);
    });
  }

  const location = useLocation();
  let roomID = location.state.room_id;
  let getMessages = async () => {
    let response = await fetch(
      "http://127.0.0.1:8000/messaging/room/" + roomID,
      {
        // + this.props.match.params.id
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + String(authTokens.access),
        },
      }
    );
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
          <p key={message.id}>
            <div style={messageBoxStyle}>
              Sender: {message.sender}
              <br />
              Recipient: {message.recipient}
              <br />
              Title: {message.title}
              <br />
              Body: {message.body}
              <br />
              Timestamp: {message.created_at}
            </div>
            <button
              style={{ backgroundColor: "orange" }}
              onClick={() => deleteMessage(message.id)}
            >
              Delete Message
            </button>
            <br />
            <br />
          </p>
        ))}
      </ul>
      <hr />
      <button onClick={() => history.push("/compose")}>Compose Message</button>
      <ScrollToBottom />
    </div>
  );
};

export default ChatPage;