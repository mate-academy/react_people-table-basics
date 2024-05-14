import { Loader } from './components/Loader';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.scss';
import { NavBar } from './components/NavBar';
import { PeopleTable } from './components/People.Table';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">
        <h1 className="title">Home Page</h1>
        <h1 className="title">People Page</h1>
        <h1 className="title">Page not found</h1>

        <div className="block">
          <div className="box table-container">
            <Loader />

            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>

            <p data-cy="noPeopleMessage">There are no people on the server</p>

            <PeopleTable />
          </div>
        </div>
      </div>
    </main>
  </div>
);
