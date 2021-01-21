import ChangeRoleBtn from "../buttons/changeRole.js";
import { Navbar, Nav, Row, Col } from "react-bootstrap";
import LogoutBtn from "../buttons/logoutButton.js";
import { Link } from "react-router-dom";

const UserRoute = ({ setLoggedIn }) => {
  return (
    <>
      {/* <h1>User Route</h1> */}
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
            Previous Event
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
