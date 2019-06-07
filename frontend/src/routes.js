import { Route, Switch } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Forgot from "./components/Auth/Forgot";
import Verify from "./components/Auth/Verify";
import Dashboard from "./components/Dashboard";
import ViewRide from "./components/ViewRide";
import Profile from "./components/Profile";
import Notifications from "./components/Notifications";

const routes = (
  <Route path="/" component={App}>
    <Route path="auth/login" component={Login} />
    <Route path="register" component={Register} />
    <Route path="forgot-password" component={Forgot} />
    <Route path="dashboard" component={Dashboard} />
    <Route path="view-ride" component={ViewRide} />
    <Route path="profile" component={Profile} />
    <Route path="notifications" component={Notifications} />
    <Route path="verification" component={Verify} />
  </Route>
);

export default routes;
