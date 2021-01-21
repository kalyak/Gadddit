import { Redirect, useRouteMatch } from "react-router-dom";
import HostRoute from "../route/route-host.js";
import UserRoute from "../route/route-user.js";

const NavBar = ({ setLoggedIn }) => {
  const isHost = useRouteMatch({
    path: "/host",
  });

  const isAttendee = useRouteMatch({
    path: "/user",
  });

  if (isHost) {
    return <HostRoute setLoggedIn={setLoggedIn} />;
  } else if (isAttendee) {
    return <UserRoute setLoggedIn={setLoggedIn} />;
  } else {
    return <Redirect to='/user/' />;
  }
};

export default NavBar;
