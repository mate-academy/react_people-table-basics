import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import 'bulma';
import App from './App';

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root'),
);
