import { Link } from "react-router-dom";
import AppURL from "../route/route-constants.js";
const SignUpBtn = () => {
  return (
    <button>
      <Link to={AppURL.main.signup}>Sign Up</Link>
    </button>
  );
};

export default SignUpBtn;
