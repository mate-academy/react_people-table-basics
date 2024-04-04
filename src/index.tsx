import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route
          path=":currentId"
          element={<h1 className="title">Page not found</h1>}
        />
        <Route index element={<h1 className="title">Home Page</h1>} />
        <Route path="people/:slug?" element={<PeoplePage />} />
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Route>
    </Routes>
  </Router>,
);
