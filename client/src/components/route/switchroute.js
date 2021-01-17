import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import HostHosted from "../pages/host-allHosted";
import HostHosting from "../pages/host-allHosting";
import HostCreate from "../pages/host-createEvent";
import HostRoom from "../pages/host-room";
import UserAttended from "../pages/user-allAttended";
import UserUpcoming from "../pages/user-allUpcoming";
import EnterRoom from "../pages/user-enterRoom";
import UserRoom from "../pages/user-room";
import NavBar from "./NavBar";

const SwitchRoute = () => {
  return (
    <Router>
      <NavBar />

      <Switch>
        <Route exact path='/host/:userid'>
          <HostHosting />
        </Route>
        <Route exact path='/host/:userid/hosted'>
          <HostHosted />
        </Route>
        <Route exact path='/host/:userid/createroom'>
          <HostCreate />
        </Route>
        <Route exact path='/host/:userid/:roomid'>
          <HostRoom />
        </Route>
        <Route exact path='/user/:userid/'>
          <UserUpcoming />
        </Route>
        <Route exact path='/user/:userid/attended'>
          <UserAttended />
        </Route>

        <Route exact path='/user/:userid/enterroom'>
          <EnterRoom />
        </Route>
        <Route exact path='/user/:userid/:roomid'>
          <UserRoom />
        </Route>
      </Switch>
    </Router>
  );
};
export default SwitchRoute;
