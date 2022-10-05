import React from 'react';
import { Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './components/Home'
import PrivacyPolicy from './components/PrivacyPolicy';
import Remindrs from './components/remindrs';
import Support from './components/Support';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route exact path="/remindrs">
          <Remindrs></Remindrs>
        </Route>
        <Route exact path="/remindrs/privacypolicy">
          <PrivacyPolicy></PrivacyPolicy>
        </Route>
        <Route exact path="/remindrs/support">
          <Support></Support>
        </Route>
				{/* <Route exact path="/shopping">
					<Shopping></Shopping>
				</Route> */}
				<Route exact path="/logo3.png">
				
				</Route>
      </Switch>
    </div>
  );
}

export default App;
