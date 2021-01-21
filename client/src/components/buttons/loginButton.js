import { Link } from "react-router-dom";
import AppURL from "../route/route-constants";
import { Button } from "react-bootstrap";

const LoginBtn = () => {
  return (
    <Link to={AppURL.main.login}>
      <Button>Login</Button>
    </Link>
  );
};

export default LoginBtn;
