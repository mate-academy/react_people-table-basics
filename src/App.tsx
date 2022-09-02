import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
// import './App.css';
import { NotFoundPage } from './components/NotFoundPage';
import { Navbar } from './components/NavBar';
import { HomePage } from './components/HomePage';
import { People } from './components/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route
            path="people"
            element={(
              <>
                <People />
              </>
            )}
          >
            <Route path=":slug" element={<People />} />
          </Route>
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </div>
    </main>
  </div>
);
