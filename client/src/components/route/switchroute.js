import { Route, Switch } from "react-router-dom";
import HostHosted from "../pages/host-allHosted";
import HostHosting from "../pages/host-allHosting";
import HostCreate from "../pages/host-createEvent";
import EditRoom from "../pages/host-editRoom";
import HostRoom from "../pages/host-room";
import UserAttended from "../pages/user-allAttended";
import UserUpcoming from "../pages/user-allUpcoming";
import EnterRoom from "../pages/user-enterRoom";
import UserRoom from "../pages/user-room";

const SwitchRoute = () => {
  return (
    <Switch>
      <Route exact path='/host'>
        <HostHosting />
      </Route>
      <Route exact path='/host/hosted'>
        <HostHosted />
      </Route>
      <Route exact path='/host/createroom'>
        <HostCreate />
      </Route>
      <Route exact path='/host/:roomid'>
        <HostRoom />
      </Route>
      <Route exact path='/host/:roomid/edit'>
        <EditRoom />
      </Route>
      <Route exact path='/user/'>
        <UserUpcoming />
      </Route>
      <Route exact path='/user/attended'>
        <UserAttended />
      </Route>

      <Route exact path='/user/enterroom'>
        <EnterRoom />
      </Route>
      <Route path='/user/:roomid'>
        <UserRoom />
      </Route>
    </Switch>
  );
};
export default SwitchRoute;
