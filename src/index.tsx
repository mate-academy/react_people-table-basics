import { createRoot } from 'react-dom/client';
import { Route, HashRouter as Router, Routes, Navigate} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { HomePage } from './HomePage';
import { PeoplePage } from './PeoplePage';
import { PageNotFound } from './PageNotFound';

const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="/people" element={<PeoplePage />} >
        <Route path=":slug" element={<PeoplePage />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
    <App />
  </Router>
);

createRoot(document.getElementById('root') as HTMLDivElement).render(
<Root/>);
