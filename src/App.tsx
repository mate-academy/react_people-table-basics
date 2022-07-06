import './App.scss';
import {
  Routes, Route, Navigate,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { Header } from './pages/Header/Header';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};
