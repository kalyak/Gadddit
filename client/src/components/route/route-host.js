import { Link } from "react-router-dom";
import ChangeRoleBtn from "../buttons/changeRole";

const HostRoute = () => {
  return (
    <>
      <h1>Host Route</h1>

      <div>
        <nav>
          <ul>
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
          </ul>
          {/* START - Temporary - to be removed */}
          <ul>
            Temporary List:
            <li>
              <a href='/'>HOME</a>
            </li>
          </ul>
          {/* END - Temporary - to be removed */}
        </nav>
      </div>
    </>
  );
};

export default HostRoute;
