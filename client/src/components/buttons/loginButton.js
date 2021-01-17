import { Link } from "react-router-dom";
import AppURL from "../route/route-constants";

const LoginBtn = () => {
  return (
    <button>
      <Link to={AppURL.main.login}>Login</Link>
    </button>
  );
};

export default LoginBtn;
