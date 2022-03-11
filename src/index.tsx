import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

ReactDOM.render(
  <Router basename="/react_people-table-basics/">
    <App />
  </Router>,
  document.getElementById('root'),
);
