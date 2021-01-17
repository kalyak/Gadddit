import logo from "./logo.svg";
import "./App.css";
import React from "react";
import MainRoute from "./components/route/route-main.js";
import HostRoute from "./components/route/route-host.js";
import UserRoute from "./components/route/route-user.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/user*">
            <UserRoute />
          </Route>
          <Route exact path="/host*">
            <HostRoute />
          </Route>
          <Route exact path="/*">
            <MainRoute />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
