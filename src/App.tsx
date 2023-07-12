import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NavigationLink } from './components/NavigationLink/NavigationLink';
import { PeoplePages } from './components/PeoplePage/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavigationLink to="/" title="Home" />
          <NavigationLink to="/people" title="People" />
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<h1 className="title">Home Page</h1>} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people">
            <Route index element={<PeoplePages />} />
            <Route
              path=":slug"
              element={<PeoplePages />}
            />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);
