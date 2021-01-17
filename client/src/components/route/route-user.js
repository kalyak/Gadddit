import ChangeRoleBtn from "../buttons/changeRole.js";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import LogoutBtn from "../buttons/logoutButton.js";

const UserRoute = () => {
  return (
    <>
      {/* <h1>User Route</h1> */}
      <Navbar bg='info' variant='dark' sticky='top'>
        <Navbar.Brand href='/user'>Gaddit</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link href='/user/:userid'>User Home</Nav.Link>
          <Nav.Link href='/user/:userid/attended'>Attended</Nav.Link>
          <Nav.Link href='/user/:userid/enterroom'>Enter Room</Nav.Link>
          <Nav.Link href='/user/:userid/:roomid'>User Room</Nav.Link>
          <ChangeRoleBtn />
          <LogoutBtn />
        </Nav>
        {/* START - Temporary - to be removed */}
        <ul>
          Temporary List:
          <li>
            <a href='/'>HOME</a>
          </li>
        </ul>
        {/* END - Temporary - to be removed */}
      </Navbar>
    </>
  );
};

export default UserRoute;
