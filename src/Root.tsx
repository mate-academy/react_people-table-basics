import {
  HashRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeopleList } from './components/PeopleList';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="*" element={<NotFoundPage />} />
        <Route index element={<HomePage />} />
        <Route path="people">
          <Route path=":slug?" element={<PeopleList />} />
        </Route>
        <Route path="home" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </HashRouter>
);
