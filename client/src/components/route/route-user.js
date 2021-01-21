import ChangeRoleBtn from "../buttons/changeRole.js";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import LogoutBtn from "../buttons/logoutButton.js";
import { Link } from "react-router-dom";

const UserRoute = ({ setLoggedIn }) => {
  return (
    <>
      {/* <h1>User Route</h1> */}
      <Navbar bg="info" variant="dark" sticky="top">
        <Navbar.Brand href="/user">Gadddit</Navbar.Brand>
        <Nav className="mr-auto">
          <Link to="/user">User Home</Link>
          <Link to="/user/attended">Attended</Link>
          <Link to="/user/enterroom">Enter Room</Link>
          <ChangeRoleBtn />
          <LogoutBtn setLoggedIn={setLoggedIn} />
        </Nav>
      </Navbar>
    </>
  );
};

export default UserRoute;
