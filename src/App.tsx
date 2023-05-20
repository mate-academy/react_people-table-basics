import { Loader } from './components/Loader';

import './App.scss';
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './components/HomePage'

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
          <a className="navbar-item" href="#/">
            Home
          </a>

          <a
            className="navbar-item has-background-grey-lighter"
            href="#/people"
          >
            People
          </a>
        </div>
      </div>
    </nav>

    <main className="section">
      <Loader />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/people"></Route>
      </Routes>

    </main>
  </div>
);
