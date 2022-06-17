import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
	// <Auth0Provider domain="dev-5ilep2g1.us.auth0.com" clientId="UbwHTAclsvnG1fDTMnu8GNrBVu2jGhdD" redirectUri="https://isaacvando.com/#/shopping">
	<Auth0Provider domain="dev-5ilep2g1.us.auth0.com" clientId="UbwHTAclsvnG1fDTMnu8GNrBVu2jGhdD" redirectUri="localhost:3000/#/shopping">
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
	</Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
