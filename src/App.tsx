import './App.scss';
import { Navbar } from './components/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './routes/HomePage';
import NotFound from './routes/NotFound';
import PeoplePage from './routes/PeoplePage';
export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people" element={<PeoplePage />}>
            <Route path=":selectedSlug" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </main>
  </div>
);
