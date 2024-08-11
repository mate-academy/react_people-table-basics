import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/Navbar';
import { RandomPage } from './pages/RandomPage';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="*" element={<RandomPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<HomePage />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);
