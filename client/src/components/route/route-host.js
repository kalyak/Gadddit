import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import { Link } from "react-router-dom";
import ChangeRoleBtn from "../buttons/changeRole";

const HostRoute = () => {
  return (
    <>
      {/* <h1>Host Route</h1> */}

      {/* <div> */}
      <Navbar bg='danger' variant='light' sticky='top'>
        <Navbar.Brand href='/host'>Gaddit</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link href='/host/:userid'>Host Home</Nav.Link>
          <Nav.Link href='/host/:userid/hosted'>Hosted</Nav.Link>
          <Nav.Link href='/host/:userid/createroom'>Create Room</Nav.Link>
          <Nav.Link href='/host/:userid/:roomid'>Host Room</Nav.Link>
          <ChangeRoleBtn />
        </Nav>

        {/* <ul>
            Navbar:
            <li>
              <Link exact to='/host/:userid'>
                Host Home
              </Link>
            </li>
            <li>
              <Link exact to='/host/:userid/hosted'>
                Hosted
              </Link>
            </li>
            <li>
              <Link exact to='/host/:userid/createroom'>
                Create Room
              </Link>
            </li>
            <li>
              <Link exact to='/host/:userid/:roomid'>
                Host Room
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

export default HostRoute;
