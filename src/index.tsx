import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Router } from './Router';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <HashRouter>
    <Router />
  </HashRouter>,
);
