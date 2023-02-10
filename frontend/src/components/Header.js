import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const history = useHistory();
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <div>
      {user ? (
        <>
          <button onClick={() => history.push("/")}>Home</button>
          <span> | </span>
          <button onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <>
          <button to="/">Home</button>
          <span> | </span>
          <button onClick={() => history.push("/login")}>Login</button>
        </>
      )}
      <span> | </span>
      <button onClick={() => history.push("/register")}>Register</button>

      {user && <p>Hello {user.username}</p>}
    </div>
  );
};

export default Header;
