import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../pages/main-Home.js";
import About from "../pages/main-about.js";
import LoginPage from "../pages/main-Login";
import SignupPage from "../pages/main-Signup";
import AppURL from "./route-constants.js";

const MainRoute = () => {
  return (
    <>
      <h1>Home Route</h1>
      <Router>
        <div>
          <nav>
            <ul>
              Navbar:
              <li>
                <Link to={AppURL.main.home}>Home</Link>
              </li>
              <li>
                <Link to={AppURL.main.about}>About</Link>
              </li>
              <li>
                <Link to={AppURL.main.login}>Login</Link>
              </li>
              <li>
                <Link to={AppURL.main.signup}>signup</Link>
              </li>
            </ul>

            {/* START - Temporary - to be removed */}
            <ul>
              Temporary list:
              <li>
                <a href="/user/:userid">User</a>
              </li>
              <li>
                <a href="/host/:userid">Host</a>
              </li>
            </ul>
            {/* END - Temporary - to be removed */}
          </nav>
          <Switch>
            <Route exact path={AppURL.main.about}>
              <About />
            </Route>

            <Route exact path={AppURL.main.home}>
              <Home />
            </Route>

            <Route exact path={AppURL.main.login}>
              <LoginPage />
            </Route>

            <Route exact path={AppURL.main.signup}>
              <SignupPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default MainRoute;
