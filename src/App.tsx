import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './HomePage';
import { NotFoundPage } from './NotFoundPage';
import { PeoplePage } from './PeoplePage';
import { LayoutComponent } from './components/LayoutComponent';

export const App = () => (
  <LayoutComponent>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to={'/'} replace />} />
      <Route path="/people">
        <Route index element={<PeoplePage />} />
        <Route path=":slug?" element={<PeoplePage />} />
      </Route>
      <Route path={'*'} element={<NotFoundPage />} />
    </Routes>
  </LayoutComponent>
);
