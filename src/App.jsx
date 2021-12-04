/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { getPeople } from './api/server';

import './App.scss';
import HomePage from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

const App = () => {
  const [people, setPeople] = useState([]);
  const [filterPeople, setFilterPeople] = useState([]);

  useEffect(() => {
    async function loadPeople() {
      const newArr = await getPeople();

      const newPeople = newArr.map((person) => {
        const child = { ...person };
        const fF = newArr.filter(parent => child.fatherName === parent.name);
        const fM = newArr.filter(parent => child.motherName === parent.name);

        if (fF.length > 0) {
          const father = newArr.filter(parent => (
            child.fatherName === parent.name
          ));

          child.fatherName = { ...father[0] };
        }

        if (fM.length > 0) {
          const mother = newArr.filter(parent => (
            child.motherName === parent.name
          ));

          child.motherName = { ...mother[0] };
        }

        return child;
      });

      setFilterPeople(newPeople);

      setPeople(newArr);
    }

    loadPeople();

    console.log(filterPeople);
  }, []);

  return (
    <div className="App">
      <header>
        <nav className="nav">
          <div className="nav-my_site">
            <Link to="/" className="nav__link">Home</Link>
            <Link to="/people" className="nav__link">PeoplePage</Link>
          </div>
        </nav>
      </header>
      <h1 className="App__title">My site</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage people={people} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
