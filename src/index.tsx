import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { PeopleProvider } from './components/context/PeopleContext';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <PeopleProvider>
    <Router>
      <App />
    </Router>
  </PeopleProvider>,
);
