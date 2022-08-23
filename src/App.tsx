import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import PeoplePage from './components/PeoplePage/PeoplePage';
import NotFound from './components/NotFound/NotFound';
import Navbar from './components/Navbar/Navbar';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />
      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />}>
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
