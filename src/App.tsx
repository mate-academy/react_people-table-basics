import { Loader } from './components/Loader';
import { Home } from './components/Home/Home';
import { People } from './components/People/People';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import './App.scss';
import { Route, Routes } from 'react-router-dom';

export const App = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <Home />
        <People />
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <div className="block">
          <div className="box table-container">
            <Loader />

            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>

            <p data-cy="noPeopleMessage">There are no people on the server</p>
          </div>
        </div>
      </div>
    </main>
  </div>
);
