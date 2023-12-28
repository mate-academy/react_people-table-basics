import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Root } from './Root';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container)
  .render(
    <Router>
      <Root />
    </Router>,
  );
