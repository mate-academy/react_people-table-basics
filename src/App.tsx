import './App.scss';
import {
  NavLink,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { PeopleTable } from './components/PeopleTable';
import { PageNotFound } from './components/PageNotFound';
import { getPeople } from './api';
import { Person } from './Types/Person';
import 'bulma/css/bulma.css';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);

  getPeople()
    .then(peopleFromServer => setPeople(peopleFromServer));

  const preparedPeople = people
    .map(currentPerson => ({
      ...currentPerson,
      mother: people.find(person => person.name === currentPerson.motherName),
      father: people.find(person => person.name === currentPerson.fatherName),
    }));

  return (

    <div className="App">
      <header className="container">
        <nav className="navbar">
          <NavLink to="/" className="navbar-item">
            Home Page
          </NavLink>

          <NavLink to="/people" className="navbar-item">
            People Table
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route
          path="/people"
          element={<PeopleTable people={preparedPeople} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};
