// import { Loader } from './components/Loader';

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage.tsx/HomePage';
import { PeoplePage } from './components/PeoplePage.tsx/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage.tsx/NotFoundPage';
import { NavBar } from './components/NavBar/NavBar';

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
          <NavBar />
          {/* <NavLink className="navbar-item" to="#/">
            Home
          </NavLink>

          <NavLink
            className="navbar-item has-background-grey-lighter"
            to="#/people"
          >
            People
          </NavLink> */}
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:slug" element={<PeoplePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
        {/* <h1 className="title">Home Page</h1> */}
        {/* <h1 className="title">People Page</h1> */}
        {/* <h1 className="title">Page not found</h1> */}
      </div>
    </main>
  </div>
);
