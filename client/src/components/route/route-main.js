import { Link } from "react-router-dom";
import AppURL from "./route-constants.js";
import Navbar from "react-bootstrap/esm/Navbar";
import Nav from "react-bootstrap/esm/Nav";

const MainRoute = () => {
  return (
    <>
      <h1>Home Route</h1>
      <Navbar bg='dark' variant='dark' sticky='top'>
        <Navbar.Brand href='/user'>Gaddit</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link href={AppURL.main.home}>Home</Nav.Link>
          <Nav.Link href={AppURL.main.about}>About</Nav.Link>
          <Nav.Link href={AppURL.main.login}>Login</Nav.Link>
          <Nav.Link href={AppURL.main.signup}>Sign Up</Nav.Link>
        </Nav>

        {/* <ul>
          Navbar:
          <li>
            <Link to={AppURL.main.home}>Home</Link>
          </li>
          <li>
            <Link to={AppURL.main.about}>About</Link>
          </li>
          <li>
            <Link to={AppURL.main.login}>Login</Link>
          </li>
          <li>
            <Link to={AppURL.main.signup}>signup</Link>
          </li>
        </ul> */}

        {/* START - Temporary - to be removed */}
        {/* <ul>
          Temporary list:
          <li>
            <a href='/user/:userid'>User</a>
          </li>
          <li>
            <a href='/host/:userid'>Host</a>
          </li>
        </ul> */}
        {/* END - Temporary - to be removed */}
      </Navbar>
    </>
  );
};

export default MainRoute;
