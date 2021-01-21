import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import ChangeRoleBtn from "../buttons/changeRole.js";
import LogoutBtn from "../buttons/logoutButton.js";

const UserRoute = ({ setLoggedIn }) => {
  return (
    <>
      <Navbar
        bg="info"
        variant="dark"
        sticky="top"
        className="d-flex row align-items-center"
      >
        <Navbar.Brand as={Link} to="/user">
          Gadddit User
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/user">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/user/attended">
            Attended
          </Nav.Link>
          <Nav.Link as={Link} to="/user/enterroom">
            Join A Room
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link disabled style={{ color: "white" }}>
            You are now viewing as a User
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

export default UserRoute;
