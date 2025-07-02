import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { PeoplePage } from './Pages/PeoplePage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { Root } from './Pages/Root';
import './App.scss';

export const App = () => (
  <Routes>
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="people">
        <Route index element={<PeoplePage />} />
        <Route path=":slug" element={<PeoplePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
