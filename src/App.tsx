import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { getPeople } from './api/api';
import './App.scss';
import { PeopleTable } from './components/PeopleTable/PeopleTable';

const App: React.FC = () => {
  const [people, setPeoples] = useState<People[]>([]);
  const [updatedPeople, setUpdatedPeople] = useState<UpdatedPersons[]>([]);

  const addParents = (persons: People[]) => {
    const updatedPersons = persons.map((person) => {
      const mother = people.find(
        (child: People) => (child.motherName === person.name),
      );

      const father = people.find(
        (child: People) => (child.motherName === person.name),
      );

      const {
        name,
        sex,
        born,
        died,
        fatherName,
        motherName,
        slug,
      } = person;

      const updatedPerson = {
        name,
        sex,
        born,
        died,
        fatherName,
        motherName,
        slug,
        mother,
        father,
      };

      return updatedPerson;
    });

    return updatedPersons;
  };

  const onAdd = () => {
    getPeople()
      .then((persons) => {
        return setPeoples(persons);
      });
  };

  const path = useLocation();

  if (path.pathname === '/people' && people.length === 0) {
    onAdd();
  }

  useEffect(() => {
    if (people.length !== 0) {
      setUpdatedPeople(addParents(people));
    }
  }, [people]);

  return (
    <>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          <br />
          <NavLink to="/people">People</NavLink>
        </nav>
      </header>

      <div className="App">
        <Routes>
          {/* <Route path="/people" element={<p>People page</p>} /> */}
          <Route
            path="/people"
            element={
              updatedPeople.length > 0
                ? (<PeopleTable people={updatedPeople} />)
                : <p>Please whait</p>
            }
          />
          <Route path="/" element={<h1>Home page</h1>} />
          <Route path="/home" element={<Navigate replace to="/" />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
