import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './App';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root'),
);
