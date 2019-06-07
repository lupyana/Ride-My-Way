import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Forgot from "./components/Auth/Forgot";
import Verify from "./components/Auth/Verify";
import Dashboard from "./components/Dashboard";
import ViewRide from "./components/ViewRide";
import Profile from "./components/Profile";
import Notifications from "./components/Notifications";
import error404 from "./components/error/404";
import PrivateRoute from "./components/ProtectedRoute";

import "./css/App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot-password" component={Forgot} />
        <Route path="/verification" component={Verify} />
        <PrivateRoute exact path="/view-ride" component={ViewRide} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute exact path="/notifications" component={Notifications} />
        <PrivateRoute exact path="/" component={Dashboard} />
        <Route component={error404} />
      </Switch>
    </div>
  );
}

export default App;
