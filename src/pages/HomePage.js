import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import ComposeButton from "../components/ComposeButton";

const HomePage = () => {
  const [rooms, setRooms] = useState([]);
  const { user, authTokens, logoutUser } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const getRooms = async () => {
      const response = await fetch("http://127.0.0.1:8000/messaging/room/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${authTokens.access}`,
        },
      });

      const data = await response.json();

      console.log(user.username);
      console.log(authTokens.access);

      if (response.status === 200) {
        setRooms(data.results);
      } else if (response.statusText === "Unauthorized") {
        logoutUser();
      }
    };
    getRooms();
  }, [authTokens.access, user.username, logoutUser]);

  return (
    <div className="inbox_div">
      <div className="page-title-container">
        <h1 className="page_title">Inbox</h1>
      </div>
      <ul>
        {rooms.map((room) => {
          const otherUser =
            user.username === room.user1 ? room.user2 : room.user1;
          return user.username === room.user1 ||
            user.username === room.user2 ? (
            <li key={room.id}>
              {/* Room {room.id}:{" "} */}
              <Button
                variant="contained"
                onClick={() => history.push("/chat", { room_id: room.id })}
              >
                Chat with {otherUser}
              </Button>
            </li>
          ) : null;
        })}
      </ul>
      {rooms.length > 0 && <ComposeButton />}
    </div>
  );
};

export default HomePage;
