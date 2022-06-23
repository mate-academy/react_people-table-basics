import React from 'react';
import * as reactRouterDom from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { PeopleTable } from './components/PeoplePage/PeoplePage';

const App: React.FC = () => {
  return (
    <div className="App">
      <nav>
        <reactRouterDom.NavLink
          to="/"
          className="button m-5"
        >
          Home
        </reactRouterDom.NavLink>
        {' '}
        <reactRouterDom.NavLink
          to="/people"
          className="button m-5"
        >
          People page
        </reactRouterDom.NavLink>
      </nav>
      <reactRouterDom.Routes>
        <reactRouterDom.Route path="/" element={<HomePage />} />
        <reactRouterDom.Route
          path="/home"
          element={
            <reactRouterDom.Navigate to="/" replace />
          }
        />
        <reactRouterDom.Route path="/people" element={<PeopleTable />} />
        <reactRouterDom.Route path="*" element={<PageNotFound />} />
      </reactRouterDom.Routes>
    </div>
  );
};

export default App;
