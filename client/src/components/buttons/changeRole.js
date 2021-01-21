import { Link, useRouteMatch } from "react-router-dom";

const ChangeRoleBtn = () => {
  const isHost = useRouteMatch({
    path: "/host",
  });

  const isAttendee = useRouteMatch({
    path: "/user",
  });

  if (isHost) {
    return (
      <Link to='/user/'>
        <button>Switch to Attendee </button>
      </Link>
    );
  }
  if (isAttendee) {
    return (
      <Link to='/host/'>
        <button>Switch to Host</button>
      </Link>
    );
  }
};

export default ChangeRoleBtn;
