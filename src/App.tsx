import {
  Navigate, Route, Routes,
} from 'react-router-dom';

import './App.scss';
import { HomePage } from './Pages/HomePage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { PeoplePage } from './Pages/PeoplePage';
import { NavBar } from './components/NavBar/NavBar';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">

        <Routes>
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>

          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

      </div>
    </main>
  </div>
);
