import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import ChangeRoleBtn from "../buttons/changeRole.js";
import LogoutBtn from "../buttons/logoutButton.js";

const UserRoute = ({ setLoggedIn }) => {
  return (
    <>
      {/* <h1>User Route</h1> */}
      <Navbar
        bg='info'
        variant='dark'
        sticky='top'
        className='d-flex row align-items-center'
      >
        <Navbar.Brand as={Link} to='/user'>
          Gadddit
        </Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link as={Link} to='/user'>
            User Home
          </Nav.Link>
          <Nav.Link as={Link} to='/user/attended'>
            Attended
          </Nav.Link>
          <Nav.Link as={Link} to='/user/enterroom'>
            Enter Room
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link disabled>You are now logged in as a user.</Nav.Link>
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
