import AppURL from "./route-constants.js";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import SignUpBtn from "../buttons/signupButton.js";
import LoginBtn from "../buttons/loginButton.js";
import { Link } from "react-router-dom";

const MainRoute = () => {
  return (
    <>
      {/* <h1>Home Route</h1> */}
      <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand href="/">Gaddit</Navbar.Brand>
        <Nav className="mr-auto">
          <Link to={AppURL.main.home}>Home</Link>
          <Link to={AppURL.main.about}>About</Link>
          <LoginBtn />
          <SignUpBtn />
        </Nav>
      </Navbar>
    </>
  );
};

export default MainRoute;
