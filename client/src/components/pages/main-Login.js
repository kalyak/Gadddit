import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <>
      <h1>Login Page</h1>
      <p>To add in login form here</p>

      <a href="host/:userid">Select as host during login...</a>
      <br />
      <a href="user/:userid">Select as user during login...</a>
    </>
  );
};

export default LoginPage;
