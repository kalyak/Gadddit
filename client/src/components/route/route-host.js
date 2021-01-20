import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import { Link } from "react-router-dom";
import ChangeRoleBtn from "../buttons/changeRole";
import LogoutBtn from "../buttons/logoutButton";

const HostRoute = () => {
  return (
    <>
      {/* <h1>Host Route</h1> */}
      <Navbar bg='danger' variant='light' sticky='top'>
        <Navbar.Brand href='/host'>Gaddit</Navbar.Brand>
        <Nav className='mr-auto'>
          <Link to='/host'>Host Home</Link>
          <Link to='/host/hosted'>Hosted</Link>
          <Link to='/host/createroom'>Create Room</Link>
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

export default HostRoute;
