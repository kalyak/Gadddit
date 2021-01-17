import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../pages/main-Home.js";
import About from "../pages/main-about.js";
import LoginPage from "../pages/main-Login";
import SignupPage from "../pages/main-Signup";
import AppURL from "./route-constants.js";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const MainRoute = () => {
  return (
    <>
      {/* <h1>Home Route</h1> */}

      <Navbar bg="info" variant="dark" sticky="top">
        <Navbar.Brand href="/user">Gaddit</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
      </Navbar>
      {/* <Router>
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
            </ul> */}

      {/* START - Temporary - to be removed */}
      {/* <ul>
        Temporary list:
        <li>
          <a href="/user/:userid">User</a>
        </li>
        <li>
          <a href="/host/:userid">Host</a>
        </li>
      </ul> */}
      {/* END - Temporary - to be removed */}
      {/* </nav>
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
      </Router> */}
    </>
  );
};

export default MainRoute;
