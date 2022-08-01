import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getPeople } from './api/api';
import './App.scss';
import { Header } from './Components/Header';
import { PeopleTable } from './Components/PeopleTable';
import { Person } from './react-app-env';

const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => setPeople(peopleFromServer));
  }, []);

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <h1 className="title notification is-large is-success">
              Home Page
            </h1>
          }
        />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="people" element={<PeopleTable people={people} />} />
        <Route
          path="*"
          element={
            <h3 className='title notification is-danger is-light'>
              Page not found
            </h3>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
