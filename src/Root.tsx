import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import HomePage from './pages/home-page/home.page';
import PeoplePage from './pages/people-page/people.page';
import NotFoundPage from './pages/not-found/not.found.page';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" />} />

        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </HashRouter>
);
