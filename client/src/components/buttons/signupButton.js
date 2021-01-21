import { Link } from "react-router-dom";
import AppURL from "../route/route-constants.js";
import { Button } from "react-bootstrap";

const SignUpBtn = () => {
  return (
    <Link to={AppURL.main.signup}>
      <Button variant="danger">Sign Up </Button>
    </Link>
  );
};

export default SignUpBtn;
