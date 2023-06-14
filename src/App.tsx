import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { HomePage } from './Pages/HomePage';
import { PageNotFound } from './Pages/PageNotFound';
import { PeoplePage } from './Pages/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<PageNotFound />} />

          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);
