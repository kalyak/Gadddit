import react from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>WELCOME TO GADDIT</h1>

      <Link exact to="/login">
        <p>Login</p>
      </Link>
      <Link exact to="/signup">
        <p>Sign up</p>
      </Link>
    </>
  );
};

export default Home;
