import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Remindrs from './components/remindrs';

function App() {
  return (
    <div className="App">
      <h1>Isaac Van Doren</h1>
      <Switch>
        <Route path="/remindrs">
          <Remindrs></Remindrs>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
