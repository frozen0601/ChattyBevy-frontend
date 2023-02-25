import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const ComposePage = ({ closeModal }) => {
  const [recipient, setRecipient] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { user, authTokens } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const message = {
      sender: user.username,
      recipient,
      title,
      body,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/messaging/room/1/message/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${authTokens.access}`,
          },
          body: JSON.stringify(message),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsPending(false);
      closeModal(); // close the modal after the message is sent
    } catch (error) {
      console.error(error);
      setIsPending(false);
    }
  };

  return (
    <div>
      <div className="page-title-container"></div>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-row">
          <label htmlFor="sender">Send by:</label>
          <span id="sender">{user.username}</span>
        </div>
        <div className="form-row">
          <label htmlFor="recipient">Send to:</label>
          <input
            id="recipient"
            name="recipient"
            type="text"
            required
            value={recipient}
            placeholder="Enter Recipient"
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            type="input"
            required
            value={title}
            placeholder="Enter Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            name="body"
            type="textarea"
            rows="15"
            cols="60"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
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
