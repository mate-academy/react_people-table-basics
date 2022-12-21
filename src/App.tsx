import { Navigate, Route, Routes } from 'react-router-dom';
// import { Loader } from './components/Loader';

import './App.scss';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

export const App = () => (
  <div data-cy="app">

    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>

          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* <div className="block">
          <div className="box table-container">
            <Loader />

            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>

            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          </div>
        </div> */}
      </div>
    </main>
  </div>
);
