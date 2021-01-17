import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HostHosted from "../pages/host-allHosted";
import HostHosting from "../pages/host-allHosting";
import HostCreate from "../pages/host-createEvent";
import HostInRoom from "../pages/host-room";

const UserRoute = () => {
  return (
    <>
      <h1>Host Route</h1>

      <Router>
        <div>
          <nav>
            <ul>
              Navbar:
              <li>
                <Link exact to="/host/:userid">
                  Host Home
                </Link>
              </li>
              <li>
                <Link exact to="/host/:userid/hosted">
                  Hosted
                </Link>
              </li>
              <li>
                <Link exact to="/host/:userid/createroom">
                  Create Room
                </Link>
              </li>
              <li>
                <Link exact to="/host/:userid/:roomid">
                  Host Room
                </Link>
              </li>
              <li>
                <a href="/user/:userid">Switch to user</a>
              </li>
            </ul>
            {/* START - Temporary - to be removed */}
            <ul>
              Temporary List:
              <li>
                <a href="/">HOME</a>
              </li>
            </ul>
            {/* END - Temporary - to be removed */}
          </nav>
          <Switch>
            <Route exact path="/host/:userid">
              <HostHosting />
            </Route>
            <Route exact path="/host/:userid/hosted">
              <HostHosted />
            </Route>
            <Route exact path="/host/:userid/createroom">
              <HostCreate />
            </Route>
            <Route exact path="/host/:userid/:roomid">
              <HostInRoom />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default UserRoute;
