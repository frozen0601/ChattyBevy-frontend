import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  let [rooms, setRooms] = useState([]);
  let { user, authTokens, logoutUser } = useContext(AuthContext);
  useEffect(() => {
    getRooms();
  }, []);

  const history = useHistory();

  let getRooms = async () => {
    let response = await fetch("http://127.0.0.1:8000/messaging/room/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + String(authTokens.access),
      },
    });
    let data = await response.json();
    console.log(user.username);
    console.log(authTokens.access);
    if (response.status === 200) {
      setRooms(data.results);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  return (
    <div>
      <p>Welcome to the home page :)</p>
      <ul>
        {rooms.map(
          (room) =>
            // we want to see the other room member's name
            user.username === room.user1 && (
              <>
                <li key={room.id}>Room {room.id}:</li>
                <button
                  onClick={() => history.push("/chat", { room_id: room.id })}
                >
                  Chat with {room.user2}
                </button>
              </>
            )
        )}
        {rooms.map(
          (room) =>
            // we want to see the other room member's name
            user.username === room.user2 && (
              <>
                <li key={room.id}>Room {room.id}:</li>
                <button
                  onClick={() => history.push("/chat", { room_id: room.id })}
                >
                  Chat with {room.user1}
                </button>
              </>
            )
        )}
      </ul>
      <hr />
      <button onClick={() => history.push("/compose")}>Compose Message</button>
    </div>
  );
};

export default HomePage;
