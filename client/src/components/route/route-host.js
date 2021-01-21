import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import ChangeRoleBtn from "../buttons/changeRole";
import LogoutBtn from "../buttons/logoutButton";

const HostRoute = ({ setLoggedIn }) => {
  return (
    <>
      <Navbar
        bg="danger"
        variant="dark"
        sticky="top"
        className="d-flex row align-items-center"
      >
        <Navbar.Brand as={Link} to="/host">
          Gadddit Host
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/host">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/host/hosted">
            Hosted
          </Nav.Link>
          <Nav.Link as={Link} to="/host/createroom">
            Create A Room
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link disabled style={{ color: "white" }}>
            You are now viewing as Host
          </Nav.Link>
        </Nav>
        <Nav>
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
