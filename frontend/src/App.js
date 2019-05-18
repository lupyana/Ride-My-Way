import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Forgot from "./components/Auth/Forgot";
import Dashboard from "./components/Dashboard";
import ViewRide from "./components/ViewRide";
import Profile from "./components/Profile";


import './css/App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Login}>
        </Route>
        <Route exact path='/register' component={Register} />
        <Route exact path='/forgot-password' component={Forgot} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/view-ride' component={ViewRide} />
        <Route exact path='/profile' component={Profile} />

      </Switch>
    </div>
  );
}

export default App;
