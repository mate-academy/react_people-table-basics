import { Navigate, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { HomePage } from './components/Pages/HomePage';
import { PeoplePage } from './components/Pages/PeoplePage';
import { ErrorPage } from './components/Pages/ErrorPage';
import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/home" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};
