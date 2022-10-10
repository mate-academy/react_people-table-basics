import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Route } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <Route path="/" element={<App />} >
        <Navigation />

        <main className="section">
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<h1 className="title">Home Page</h1>}
              />

              <Route
                path="people/"
                element={(
                  <>
                    <h1 className="title">People Page</h1>
                    <PeopleList
                      setOnLoad={setOnLoad}
                      setServerError={setServerError}
                      setPeopleLength={setPeopleLength}
                    />
                  </>
                )}
              >
                <Route
                  index
                  element={(
                    <>
                      <h1 className="title">People Page</h1>
                      <PeopleList
                        setOnLoad={setOnLoad}
                        setServerError={setServerError}
                        setPeopleLength={setPeopleLength}
                      />
                    </>
                  )}
                />
                <Route
                  path=":personSlug"
                  element={(
                    <>
                      <h1 className="title">People Page</h1>
                      <PeopleList
                        setOnLoad={setOnLoad}
                        setServerError={setServerError}
                        setPeopleLength={setPeopleLength}
                      />
                    </>
                  )}
                />
              </Route>

              <Route
                path="*"
                element={<h1 className="title">Page not found</h1>}
              />
              <Route
                path="home"
                element={<Navigate to="/" replace />}
              />
            </Routes>

            {warning
              && (
                <div className="block">
                  <div className="box table-container">
                    {onLoad && <Loader />}

                    {serverError
                      && (
                        <p data-cy="peopleLoadingError" className="has-text-danger">
                          Something went wrong
                        </p>
                      )}
                    {peopleLength === 0
                      && (
                        <p data-cy="noPeopleMessage">
                          There are no people on the server
                        </p>
                      )}

                  </div>
                </div>
              )}
          </div>
        </main>
      </Route>
    </Router>,
  );
