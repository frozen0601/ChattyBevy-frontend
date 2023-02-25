import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path ? "activeButton" : "inactiveButton";
  };

  let { user, logoutUser } = useContext(AuthContext);
  return (
    <div className="header_div">
      {user ? (
        <>
          <button className={isActive("/")} onClick={() => history.push("/")}>
            Home
          </button>
          <span> </span>
          <button className={isActive("/register")} onClick={logoutUser}>
            Logout
          </button>
        </>
      ) : (
        <>
          <button className={isActive("")} to="/">
            Home
          </button>
          <span> </span>
          <button
            className={isActive("/login")}
            onClick={() => history.push("/login")}
          >
            Login
          </button>
        </>
      )}
      <span> </span>
      <button
        className={isActive("/register")}
        onClick={() => history.push("/register")}
      >
        Register
      </button>
      <br />
      {user && <span>Hello, {user.username}</span>}
    </div>
  );
};

export default Header;
