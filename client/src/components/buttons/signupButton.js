import { Link } from "react-router-dom";
import AppURL from "../route/route-constants.js";
const SignUpBtn = () => {
  return (
    <Link to={AppURL.main.signup}>
      <button>Sign Up </button>
    </Link>
  );
};

export default SignUpBtn;
