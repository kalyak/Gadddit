import { Link } from "react-router-dom";
import SignUpBtn from "../buttons/signupButton";

const Home = () => {
  return (
    <>
      <h1>WELCOME TO GADDIT</h1>

      <Link exact="true" to="/login">
        <p>Login</p>
      </Link>
      {/* <Link exact to='/signup'>
        <p>Sign up</p>
      </Link> */}
      <SignUpBtn />
    </>
  );
};

export default Home;
