import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { People } from './components/People';
import { Nav } from './components/Nav';
import { Home } from './components/Home';
import { NotFound } from './components/NotFound';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <Nav />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Navigate to="/" replace />} />

            <Route path="people" element={<People />}>
              <Route index element={<People />} />
              <Route path=":personId" element={<People />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
