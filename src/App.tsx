import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './Pages/PeoplePage';
import { NavBar } from './components/NavBar';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="people">
              <Route
                index
                element={<PeoplePage />}
              />
              <Route
                path=":slug"
                element={<PeoplePage />}
              />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
