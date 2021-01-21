import { Link, useRouteMatch } from "react-router-dom";
import { Button } from "react-bootstrap";

const ChangeRoleBtn = () => {
  const isHost = useRouteMatch({
    path: "/host",
  });

  const isAttendee = useRouteMatch({
    path: "/user",
  });

  if (isHost) {
    return (
      <Link to="/user">
        <Button variant="warning">Switch to Attendee </Button>
      </Link>
    );
  }
  if (isAttendee) {
    return (
      <Link to="/host">
        <Button variant="warning">Switch to Host</Button>
      </Link>
    );
  }
};

export default ChangeRoleBtn;
