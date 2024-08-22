import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { PeopleProvider } from './context/PeopleContext';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { AppRouter } from './Router/AppRouter';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <PeopleProvider>
      <AppRouter />
    </PeopleProvider>
  </Router>,
);
