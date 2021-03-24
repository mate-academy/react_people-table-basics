import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import App from './App';

ReactDOM.render(
  <HashRouter basename="/react_people-table-basics/">
    <App />
  </HashRouter>,
  document.getElementById('root'),
);
