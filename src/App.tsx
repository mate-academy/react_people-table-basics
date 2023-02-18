import { Navigate, Route, Routes } from 'react-router-dom';
import { Page } from './components/Page';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFound } from './components/NotFound';
import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Routes>
      <Route path="/" element={<Page />}>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </div>
);
