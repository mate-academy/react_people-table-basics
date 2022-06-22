import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { PeopleTable } from './components/PeoplePage/PeoplePage';

const App: React.FC = () => {
  return (
    <div className="App">
      <nav>
        <NavLink
          to="/"
          className="button m-5"
        >
          Home
        </NavLink>
        {' '}
        <NavLink
          to="/people"
          className="button m-5"
        >
          People page
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeopleTable />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
