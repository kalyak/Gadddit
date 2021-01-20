import ChangeRoleBtn from "../buttons/changeRole.js";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import LogoutBtn from "../buttons/logoutButton.js";

const UserRoute = () => {
  return (
    <>
      {/* <h1>User Route</h1> */}
      <Navbar bg="info" variant="dark" sticky="top">
        <Navbar.Brand href="/user">Gaddit</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/user">User Home</Nav.Link>
          <Nav.Link href="/user/attended">Attended</Nav.Link>
          <Nav.Link href="/user/enterroom">Enter Room</Nav.Link>
          <ChangeRoleBtn />
          <LogoutBtn />
        </Nav>
      </Navbar>
    </>
  );
};

export default UserRoute;
