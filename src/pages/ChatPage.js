import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ComposeButton from "../components/ComposeButton";

const ChatPage = () => {
  const [loading, setLoading] = useState(true); // Add loading state
  const [messages, setMessages] = useState([]);
  const { authTokens, logoutUser } = useContext(AuthContext);
  const location = useLocation();
  const roomID = location.state?.room_id;
  const { user } = useContext(AuthContext);
  const messageListRef = useRef(null);

  const getMessages = useCallback(async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/messaging/room/${roomID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${authTokens.access}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        // Set the messages state variable
        setMessages(data);
      } else {
        logoutUser();
      }
      setLoading(false); // Set loading state to false
    } catch (error) {
      console.error(error);
    }
  }, [roomID, authTokens.access, logoutUser]);

  const deleteMessage = async (messageID) => {
    try {
      await fetch(
        `http://127.0.0.1:8000/messaging/room/1/message/${messageID}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: authTokens.access ? `JWT ${authTokens.access}` : null,
          },
        }
      );
      console.log("message deleted.");
    } catch (error) {
      console.error(error);
    }

    // Fetch new messages after a message is deleted
    getMessages();
  };
  useEffect(() => {
    if (roomID) {
      getMessages();
    }

    // Set up a timer to fetch new messages every 5 seconds
    const interval = setInterval(() => {
      if (roomID) {
        getMessages();
      }
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(interval);
  }, [roomID, getMessages]);
  return (
    <div>
      {!loading && <ComposeButton />}
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <div className="message_box">
              <span>From: {message.sender}</span>
              <br />
              <span>To: {message.recipient}</span>
              <br />
              <span>
                <strong>Title:</strong> {message.title}
              </span>
              <br />
              <span className="message_date_time">{message.created_at}</span>
              <hr />
              <span className="message_body">{message.body}</span>
              <br />
              {user.username === message.sender && (
                <button
                  style={{ backgroundColor: "red", marginRight: "10px" }}
                  onClick={() => deleteMessage(message.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
        <li ref={messageListRef}></li>
      </ul>
    </div>
  );
};

export default ChatPage;
