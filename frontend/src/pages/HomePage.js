import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
  let [rooms, setRooms] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    getRooms();
  }, []);

  let getRooms = async () => {
    let response = await fetch("http://127.0.0.1:8000/messaging/room/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setRooms(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  return (
    <div>
      <p>You are logged to the home page!</p>
      <ul>
        {rooms.map((room) => (
          authTokens.username === room.user1 ?
          <li key={room.id}>Chat with {room.user1}</li> :
          <li key={room.id}>Chat with {room.user2}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
