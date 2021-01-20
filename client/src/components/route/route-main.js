import AppURL from "./route-constants.js";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import SignUpBtn from "../buttons/signupButton.js";
import LoginBtn from "../buttons/loginButton.js";
import { Link, Route, Switch } from "react-router-dom";
import About from "../pages/main-about.js";
import LoginPage from "../pages/main-Login.js";
import SignupPage from "../pages/main-Signup.js";
import Home from "../pages/main-Home.js";

const MainRoute = ({ setLoggedIn }) => {
  return (
    <>
      {/* <h1>Home Route</h1> */}
      <Navbar bg='dark' variant='dark' sticky='top'>
        <Navbar.Brand href='/'>Gaddit</Navbar.Brand>
        <Nav className='mr-auto'>
          <Link to={AppURL.main.home}>Home</Link>
          <Link to={AppURL.main.about}>About</Link>
          <LoginBtn />
          <SignUpBtn />
        </Nav>

        {/* START - Temporary - to be removed */}
        {/* <ul>
          Temporary list:
          <li>
            <a href="/user">User</a>
          </li>
          <li>
            <a href="/host">Host</a>
          </li>
        </ul> */}
        {/* END - Temporary - to be removed */}
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
      </Switch>
    </>
  );
};

export default MainRoute;
