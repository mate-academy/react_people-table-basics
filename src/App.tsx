import { Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';
import { Navigation } from './components/Navigation';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />
      <main className="section">
        <div className="container">
          <div className="block">
            <div className="box table-container">
              <Routes>
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/" element={<HomePage />} />
                <Route
                  path="*"
                  element={
                    <div className="container">
                      <h1 className="title">Page not found</h1>
                    </div>
                  }
                />
                <Route path="/people" element={<PeoplePage />} />

                <Route path="/people/:personHref" element={<PeoplePage />} />
              </Routes>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
