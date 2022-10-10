import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Route } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <Route path="/" element={<App />} >
        </
    </Router>,
  );
