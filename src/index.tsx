import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Routes, Route } from 'react-router-dom';
import { HomePage, PeoplePage, NotFoundPage } from './pages';

import { App } from './App';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />}></Route>
        <Route path="/people" element={<PeoplePage />}>
          <Route path=":slug" element={<PeoplePage />}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Route>
    </Routes>
  );
};

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Root />
  </Router>,
);
