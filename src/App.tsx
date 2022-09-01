import { Routes, Route, Navigate } from 'react-router-dom';
import { NavBar } from './components/Navbar/Navbar';
import HomePage from './components/Pages/HomePage';
import PeoplePage from './components/Pages/PeoplePage/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <NavBar />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people" element={<PeoplePage />}>
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<h1 className="title">Page Not Found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);
