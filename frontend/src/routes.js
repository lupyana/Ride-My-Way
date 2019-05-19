import { Route, Switch } from 'react-router-dom'
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Forgot from "./components/Auth/Forgot";
import Verify from "./components/Auth/Verify";
import Dashboard from "./components/Dashboard";
import ViewRide from "./components/ViewRide";
import Profile from "./components/Profile";
import Notifications from "./components/Notifications";

const routes = (
    <Route exact path='/' component={Login}> />
    <Route exact path='/register' component={Register} />
    <Route exact path='/forgot-password' component={Forgot} />
    <Route exact path='/dashboard' component={Dashboard} />
    <Route exact path='/view-ride' component={ViewRide} />
    <Route exact path='/profile' component={Profile} />
    <Route exact path='/notifications' component={Notifications} />
    <Route exact path='/verification' component={Verify} />
)

export default routes;
