import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage/HomePage';
import { NotfoundPage } from './pages/NotfoundPage';
import { PeoplePage } from './pages/PeoplePage';
import { PersonLink } from './pages/PersonLink';

export const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [noData, setNoData] = useState<boolean>(false);

  const changeLoading = (status: boolean) => {
    setLoading(status);
  };

  const changeError = (status: boolean) => {
    setError(status);
  };

  const changeNoData = (status: boolean) => {
    setNoData(status);
  };

  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="people"
              element={(
                <PeoplePage
                  changeLoading={changeLoading}
                  changeError={changeError}
                  changeNoData={changeNoData}
                />
              )}
            />
            <Route path="/people/:slug" element={<PersonLink />} />
            <Route path="*" element={<NotfoundPage />} />
            <Route path="/home" element={<Navigate to="/" />} />
          </Routes>

          <div className="block">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {noData && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
