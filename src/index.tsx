import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import '../node_modules/bulma/css/bulma-rtl.css';

import App from './App';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);
