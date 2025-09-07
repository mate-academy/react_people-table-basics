import 'bulma/css/bulma.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';

import { HashRouter } from 'react-router-dom';
import { App } from './App';
// import { MyProvider } from './components/dataContext/dataContext';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => (
  <HashRouter>
    {/* <MyProvider> */}
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
    {/* </MyProvider> */}
  </HashRouter>
);
