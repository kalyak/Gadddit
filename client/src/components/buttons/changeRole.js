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
      <Link to="/user/">
        <button>Switch to Attendee </button>
      </Link>
    );
  }
  if (isAttendee) {
    return (
      <Link to="/host/">
        <button>Switch to Host</button>
      </Link>
    );
  }
};

export default ChangeRoleBtn;
