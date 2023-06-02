import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainNav } from './components/MainNav';
import { PeoplePage } from './pages/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <MainNav />
    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<h1 className="title">Home Page</h1>}
          />

          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>

          <Route
            path="/people"
            element={<PeoplePage />}
          />

          <Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          />

          <Route
            path="/home"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </main>
  </div>
);
