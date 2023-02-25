import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { People } from './Pages/People';
import { Home } from './Pages/Home';
import { NotFound } from './Pages/NotFound';
import { NavBar } from './components/NavBar';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people/">
            <Route index element={<People />} />
            <Route path=":userSlug" element={<People />} />
          </Route>
          <Route
            path="/*"
            element={<NotFound />}
          />
        </Routes>
      </div>
    </main>
  </div>
);
