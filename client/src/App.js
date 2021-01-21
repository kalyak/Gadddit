import "./App.css";
import React, { useEffect, useState } from "react";
import SwitchRoute from "./components/route/switchroute";
import "bootstrap/dist/css/bootstrap.min.css";
import MainRoute from "./components/route/route-main";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import NavBar from "./components/route/NavBar";
import axios from "axios";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get("/sessions/check", { withCredentials: true })
      .then((response) => {
        console.log("checking login", response.data);
        setLoggedIn(response.data);
      })
      .catch((error) => {
        setLoggedIn(false);
      });
  }, [isLoggedIn]);

  return (
    <>
      <Router>
        {isLoggedIn ? (
          <>
            <NavBar setLoggedIn={setLoggedIn} />
            <SwitchRoute />
          </>
        ) : (
          <>
            <MainRoute setLoggedIn={setLoggedIn} />
            <Redirect to='/' />
          </>
        )}
      </Router>
    </>
  );
}

export default App;
