import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import App from './App';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);
