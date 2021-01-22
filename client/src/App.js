import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import NavBar from "./components/route/NavBar";
import MainRoute from "./components/route/route-main";
import SwitchRoute from "./components/route/switchroute";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsUp, faCheck, faSync } from "@fortawesome/free-solid-svg-icons";

library.add(faThumbsUp, faCheck, faSync);

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get("/sessions/check", { withCredentials: true })
      .then((response) => {
        // console.log("checking login", response.data);
        setLoggedIn(response.data);
      })
      .catch((error) => {
        setLoggedIn(false);
        console.log(error.response);
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
          </>
        )}
      </Router>
    </>
  );
}

export default App;
