import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Login from "./components/Login";
import Register from "./components/Register";
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Login}></Route>
        <Route exact path='/register' component={Register} />
      </Switch>
    </div>
  );
}

export default App;
