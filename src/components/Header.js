import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Button from "@mui/material/Button";

const Header = () => {
  const history = useHistory();
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <div className="header_div">
      {user ? (
        <>
          <Button onClick={() => history.push("/")}>Home</Button>
          <span> | </span>
          <Button onClick={logoutUser}>Logout</Button>
        </>
      ) : (
        <>
          <Button to="/">Home</Button>
          <span> | </span>
          <Button onClick={() => history.push("/login")}>Login</Button>
        </>
      )}
      <span> | </span>
      <Button onClick={() => history.push("/register")}>Register</Button>
        <br/>
      {user && <span>Hello, {user.username}</span>}
    </div>
  );
};

export default Header;
