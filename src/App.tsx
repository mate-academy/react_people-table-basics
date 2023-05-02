import './App.scss';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { People } from './pages/People';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { NavBar } from './components/NavBar';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/people">
              <Route index element={<People />} />
              <Route path=":slug" element={<People />} />
            </Route>
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>

        </div>
      </main>
    </div>
  );
};
