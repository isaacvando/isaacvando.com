import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import './App.css';
import Home from './components/Home'
import Remindrs from './components/Remindrs';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/remindrs">
          <Remindrs></Remindrs>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
