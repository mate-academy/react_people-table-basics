import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { People } from './components/People';
import { PageTitle } from './components/PageTitle/PageTitle';

export const App = () => {
  return (
    <div data-cy="app">

      <Navigation />
      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<PageTitle title="Home Page" />}
            />
            <Route path="people">
              <Route
                index
                element={(
                  <>
                    <PageTitle title="People Page" />
                    <People />
                  </>
                )}
              />
              <Route
                path=":personId"
                element={(
                  <>
                    <PageTitle title="People Page" />
                    <People />
                  </>
                )}
              />
            </Route>
            <Route
              path="*"
              element={
                <PageTitle title="Page not found" />
              }
            />
            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
