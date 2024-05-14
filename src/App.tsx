import { Loader } from './components/Loader';
import './App.scss';
import { NavBar } from './components/NavBar';
import { PeopleTable } from './components/PeopleTable';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useState } from 'react';

export const App = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Router>
      <div data-cy="app">
        <NavBar />

        <main className="section">
          <div className="container">
            <Switch>
              <Route exact path="/">
                <h1 className="title">Home Page</h1>
              </Route>
              <Route path="/people">
                <h1 className="title">People Page</h1>
                <PeopleTable setLoading={setLoading} />
              </Route>

              <Route>
                <h1 className="title">Page not found</h1>
              </Route>
            </Switch>

            <div className="block">
              <div className="box table-container">
                {loading && <Loader />}

                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>

                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
};
