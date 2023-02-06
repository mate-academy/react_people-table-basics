import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/Loader/pages/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { PageNotFound } from './components/Loader/pages/PageNotFound';
import { NavBar } from './components/Loader/NavBar/NavBar';

export const App = () => (
  <div data-cy="app">
    <NavBar />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </main>
  </div>
);
