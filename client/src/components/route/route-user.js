import { Link } from "react-router-dom";
import ChangeRoleBtn from "../buttons/changeRole.js";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const UserRoute = () => {
  return (
    <>
      {/* <h1>User Route</h1> */}

      {/* <div> */}
      <Navbar bg='dark' variant='dark' sticky='top'>
        <Navbar.Brand href='/user'>Gaddit</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link href='/user/:userid'>User Home</Nav.Link>
          <Nav.Link href='/user/:userid/attended'>Attended</Nav.Link>
          <Nav.Link href='/user/:userid/enterroom'>Enter Room</Nav.Link>
          <Nav.Link href='/user/:userid/:roomid'>User Room</Nav.Link>
          <ChangeRoleBtn />
        </Nav>
        {/* <ul>
            Navbar:
            <li>
              <Link exact to='/user/:userid'>
                User Home
              </Link>
            </li>
            <li>
              <Link exact to='/user/:userid/attended'>
                Attended
              </Link>
            </li>
            <li>
              <Link exact to='/user/:userid/enterroom'>
                Enter Room
              </Link>
            </li>
            <li>
              <Link exact to='/user/:userid/:roomid'>
                User Room
              </Link>
            </li>
            <li>
              <ChangeRoleBtn />
            </li>
          </ul> */}
        {/* START - Temporary - to be removed */}
        {/* <ul>
          Temporary List:
          <li>
            <a href='/'>HOME</a>
          </li>
        </ul> */}
        {/* END - Temporary - to be removed */}
      </Navbar>
      {/* </div> */}
    </>
  );
};

export default UserRoute;
