import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Route, Switch } from "react-router-dom";
import LoginBtn from "../buttons/loginButton.js";
import SignUpBtn from "../buttons/signupButton.js";
import About from "../pages/main-about.js";
import Home from "../pages/main-Home.js";
import LoginPage from "../pages/main-Login.js";
import PublicUpcoming from "../pages/public-PublicEvents.js";
import SignupPage from "../pages/main-Signup.js";
import AppURL from "./route-constants.js";
import PublicRoom from "../pages/public-room.js";

const MainRoute = ({ setLoggedIn }) => {
  return (
    <>
      {/* <h1>Home Route</h1> */}
      <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
        <Navbar.Brand href="/">Gadddit</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to={AppURL.main.home}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to={AppURL.main.about}>
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/events">
            Events
          </Nav.Link>
        </Nav>
        <Nav>
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
        <Route path={"/events"}>
          <PublicUpcoming />
        </Route>
        <Route exact path={AppURL.main.home}>
          <Home />
        </Route>
        <Route path="/public/:roomid">
          <PublicRoom />
        </Route>
        <Route>
          <Home />
        </Route>
      </Switch>
    </>
  );
};

export default MainRoute;
