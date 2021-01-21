import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Route, Switch } from "react-router-dom";
import LoginBtn from "../buttons/loginButton.js";
import SignUpBtn from "../buttons/signupButton.js";
import About from "../pages/main-about.js";
import Home from "../pages/main-Home.js";
import LoginPage from "../pages/main-Login.js";
import SignupPage from "../pages/main-Signup.js";
import AppURL from "./route-constants.js";

const MainRoute = ({ setLoggedIn }) => {
  return (
    <>
      {/* <h1>Home Route</h1> */}
      <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand href="/">Gadddit</Navbar.Brand>
        <Nav className="mr-auto">
          <Link to={AppURL.main.home}>Home</Link>
          <Link to={AppURL.main.about}>About</Link>
          <LoginBtn />
          <SignUpBtn />
        </Nav>
      </Navbar>
      <Switch>
        <Route exact path={AppURL.main.about}>
          <About />
        </Route>
        <Route exact path={AppURL.main.login}>
          <LoginPage setLoggedIn={setLoggedIn} />
        </Route>
        <Route exact path={AppURL.main.signup}>
          <SignupPage setLoggedIn={setLoggedIn} />
        </Route>
        <Route exact path={AppURL.main.home}>
          <Home />
        </Route>
        <Route>
          <Home />
        </Route>
      </Switch>
    </>
  );
};

export default MainRoute;
