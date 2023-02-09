import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <div>
      <button to="/">Home</button>
      <span> | </span>
      {user ? (
        <button onClick={logoutUser}>Logout</button>
      ) : (
        <button to="/login">Login</button>
      )}
      <p>Hello!</p>
      {console.log(user)}
      {user && <p>Hello {user.username}</p>}
    </div>
  );
};

export default Header;
