import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { People } from './components/People';
import { Navigation } from './components/Navigation';

export const App = () => (
  <div data-cy="app">

    <Navigation />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<h1 className="title">Home Page</h1>} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="/people">
            <Route index element={<People />} />
            <Route path=":personData" element={<People />} />
          </Route>

          <Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          />
        </Routes>
      </div>
    </main>
  </div>
);
