import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import AppRouting from './App.routing';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <HashRouter>
      <AppRouting />
    </HashRouter>,
  );
