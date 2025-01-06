import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NavComponent } from './components/NavComponent/NavComponent';
import { NotFound } from './components/NotFound/NotFound';
import { HomePage } from './components/HomePage/HomePage';

export const App = () => (
  <div data-cy="app">
    <NavComponent />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":personID/*" element={<PeoplePage />} />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);
