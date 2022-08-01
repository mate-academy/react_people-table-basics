import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById('root');

render(
  <HashRouter>
    <App />
  </HashRouter>,
  rootElement,
);
