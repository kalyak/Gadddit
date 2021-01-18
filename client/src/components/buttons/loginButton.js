import { Link } from "react-router-dom";
import AppURL from "../route/route-constants";

const LoginBtn = () => {
  return (
    <Link to={AppURL.main.login}>
      <button>Login</button>
    </Link>
  );
};

export default LoginBtn;
