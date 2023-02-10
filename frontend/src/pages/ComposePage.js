import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import props from "prop-types";
const messageBoxStyle = {
  color: "black",
  backgroundColor: "Cyan",
};

const ComposePage = () => {
  let [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  let [messages, setMessages] = useState([]);
  let { user, authTokens, logoutUser } = useContext(AuthContext);
  sender = user.username;

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = { sender, recipient, title, body };

    setIsPending(true);
    fetch("http://127.0.0.1:8000/messaging/room/1/message/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + String(authTokens.access),
      },
      body: JSON.stringify(message),
    }).then(() => {
      console.log("new message added.");
      setIsPending(false);
      history.go(-1)
    });
  };

  return (
    <div>
      <p>You are now in the compose page!</p>
      <p>{messages}</p>
      <form onSubmit={handleSubmit}>
        <hr />
        <label for="sender">Sender:</label>
        <p id="sender" name="sender" value={user.username}>
          {user.username}
        </p>
        <hr />
        <label for="recepient">Recepient: </label>
        <br />
        <input
          id="recepient"
          name="recepient"
          type="input"
          required
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <hr />
        <label for="title">Title: </label>
        <br />
        <input
          id="title"
          name="title"
          type="input"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <hr />
        <label for="body">Body: </label>
        <br />
        <textarea
          id="body"
          name="body"
          type="textarea"
          rows="20"
          cols="100"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <br />
        {!isPending && (
          <button id="compose_button" type="submit" value="submit">
            Compose
          </button>
        )}
        {isPending && <button disabled>Sending message...</button>}
      </form>
    </div>
  );
};

export default ComposePage;
