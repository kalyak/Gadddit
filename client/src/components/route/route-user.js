import { Link } from "react-router-dom";
import ChangeRoleBtn from "../buttons/changeRole.js";

const UserRoute = () => {
  return (
    <>
      <h1>User Route</h1>

      <div>
        <nav>
          <ul>
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

export default UserRoute;
