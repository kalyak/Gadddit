import AppURL from "./route-constants.js";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import SignUpBtn from "../buttons/signupButton.js";
import LoginBtn from "../buttons/loginButton.js";

const MainRoute = () => {
  return (
    <>
      {/* <h1>Home Route</h1> */}
      <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand href="/">Gaddit</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href={AppURL.main.home}>Home</Nav.Link>
          <Nav.Link href={AppURL.main.about}>About</Nav.Link>
          {/* <Nav.Link href={AppURL.main.login}>Login</Nav.Link> */}
          <LoginBtn />
          {/* <Nav.Link href={AppURL.main.signup}>Sign Up</Nav.Link> */}
          <SignUpBtn />
        </Nav>

        {/* START - Temporary - to be removed */}
        <ul>
          Temporary list:
          <li>
            <a href="/user">User</a>
          </li>
          <li>
            <a href="/host">Host</a>
          </li>
        </ul>
        {/* END - Temporary - to be removed */}
      </Navbar>
    </>
  );
};

export default MainRoute;
