import { useRouteMatch } from "react-router-dom";
import MainRoute from "../route/route-main.js";
import HostRoute from "../route/route-host.js";
import UserRoute from "../route/route-user.js";

const NavBar = () => {
  //   const path = useLocation();

  const isHost = useRouteMatch({
    path: "/host",
  });

  const isAttendee = useRouteMatch({
    path: "/user",
  });

  if (isHost) {
    return <HostRoute />;
  } else if (isAttendee) {
    return <UserRoute />;
  } else {
    return <MainRoute />;
  }
};

export default NavBar;
