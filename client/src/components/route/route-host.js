import { Link } from "react-router-dom";
import ChangeRoleBtn from "../buttons/changeRole";
import LogoutBtn from "../buttons/logoutButton";
import { Navbar, Nav, Row, Col } from "react-bootstrap";

const HostRoute = ({ setLoggedIn }) => {
  return (
    <>
      {/* <h1>Host Route</h1> */}
      <Navbar
        bg="danger"
        variant="dark"
        sticky="top"
        className="d-flex row align-items-center"
      >
        <Navbar.Brand as={Link} to="/host">
          Gadddit
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/host">
            Host Home
          </Nav.Link>
          <Nav.Link as={Link} to="/host/hosted">
            Hosted
          </Nav.Link>
          <Nav.Link as={Link} to="/host/createroom">
            Create Room
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link disabled>
            <p>You are now viewing as Host</p>
          </Nav.Link>
          <Nav.Link>
            <ChangeRoleBtn />
          </Nav.Link>
          <Nav.Link>
            <LogoutBtn setLoggedIn={setLoggedIn} />
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
};

export default HostRoute;
