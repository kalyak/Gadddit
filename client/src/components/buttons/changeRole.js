import { Link, useLocation, useRouteMatch } from "react-router-dom";

const ChangeRoleBtn = () => {
  const path = useLocation();

  const isHost = useRouteMatch({
    path: "/host",
  });

  const isAttendee = useRouteMatch({
    path: "/user",
  });

  console.log(path.pathname);
  console.log(isHost);
  console.log(isAttendee);

  if (isHost) {
    return (
      <button>
        <Link to='/user/:userid'>Switch to Attendee</Link>
      </button>
    );
  }
  if (isAttendee) {
    return (
      <button>
        <Link to='/host/:userid'>Switch to Host</Link>
      </button>
    );
  }
};

export default ChangeRoleBtn;
