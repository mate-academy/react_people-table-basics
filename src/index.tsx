import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Root } from './Root';
import { HashRouter } from 'react-router-dom';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <HashRouter>
    <Root />
  </HashRouter>,
);
