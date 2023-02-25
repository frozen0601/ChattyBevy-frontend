import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  let { loginUser } = useContext(AuthContext);
  return (
    <div>
      <form onSubmit={loginUser}>
        <img
          src="https://media.licdn.com/dms/image/C4E0BAQH1XctDdac7-Q/company-logo_200_200/0/1623097823344?e=2147483647&v=beta&t=8rTqKwHurtQrBu_bvD4q3JnSSnoRB9qqKgrarE6zYpo"
          alt="Company Logo"
        />
        <input type="text" name="username" placeholder="Enter Username" />
        <input type="password" name="password" placeholder="Enter Password" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default LoginPage;
