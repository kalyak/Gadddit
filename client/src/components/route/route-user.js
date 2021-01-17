import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ChangeRoleBtn from "../buttons/changeRole.js";
import UserAttended from "../pages/user-allAttended.js";
import UserUpcoming from "../pages/user-allUpcoming.js";
import EnterRoom from "../pages/user-enterRoom.js";
import UserInRoom from "../pages/user-room.js";

const UserRoute = () => {
  return (
    <>
      <h1>User Route</h1>

      {/* <Router> */}
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
              {/* <a href='/host/:userid'>Switch to Host</a> */}
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
        {/* <Switch>
            <Route exact path='/user/:userid/'>
              <UserUpcoming />
            </Route>
            <Route exact path='/user/:userid/attended'>
              <UserAttended />
            </Route>

            <Route exact path='/user/:userid/enterroom'>
              <EnterRoom />
            </Route>
            <Route exact path='/user/:userid/:roomid'>
              <UserInRoom />
            </Route>
          </Switch> */}
      </div>
      {/* </Router> */}
    </>
  );
};

export default UserRoute;
