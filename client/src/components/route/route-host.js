import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import { Link } from "react-router-dom";
import ChangeRoleBtn from "../buttons/changeRole";
import LogoutBtn from "../buttons/logoutButton";

const HostRoute = ({ setLoggedIn }) => {
  return (
    <>
      {/* <h1>Host Route</h1> */}
      <Navbar bg="danger" variant="light" sticky="top">
        <Navbar.Brand href="/host">Gadddit</Navbar.Brand>
        <Nav className="mr-auto">
          <Link to="/host">Host Home</Link>
          <Link to="/host/hosted">Hosted</Link>
          <Link to="/host/createroom">Create Room</Link>
          <ChangeRoleBtn />
          <LogoutBtn setLoggedIn={setLoggedIn} />
        </Nav>
      </Navbar>
    </>
  );
};

export default HostRoute;
