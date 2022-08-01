import './App.scss';
import {
  NavLink,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HomePage } from './components/HomePage';
import { PeopleTable } from './components/PeopleTable';
import { PageNotFound } from './components/PageNotFound';
import { getPeople } from './api';
import { Person } from './Types/Person';
import 'bulma/css/bulma.css';

export const App = () => {
  const redirect = useNavigate();
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    redirect('/');
  }, []);

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
        <Route
          path="/people"
          element={<PeopleTable people={preparedPeople} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};
