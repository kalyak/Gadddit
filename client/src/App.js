import logo from "./logo.svg";
import "./App.css";
import React from "react";
import MainRoute from "./components/route/route-main.js";
import HostRoute from "./components/route/route-host.js";
import UserRoute from "./components/route/route-user.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "./components/route/NavBar";
import SwitchRoute from "./components/route/switchroute";

function App() {
  return (
    <>
      <NavBar />
      {/* <SwitchRoute /> */}
      {/* <Router>
        <Switch>
          <Route path='/user*'>
            <UserRoute />
          </Route>
          <Route path='/host*'>
            <HostRoute />
          </Route>
          <Route exact path='/'>
            <MainRoute />
          </Route>
        </Switch>
      </Router> */}
    </>
  );
}

export default App;
