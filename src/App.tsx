import { useEffect, useState } from 'react'
import { NavLink, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { getPeople } from './api'
import './App.scss'
import { Loader } from './components/Loader'
import { Person } from './types/Person'

const PersonLink = ({ person }: { person?: Person }) => {
  if (!person) {
    return <span>-</span>;
  }

  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </NavLink>
  );
};

const HomePage = () => <h1 className="title">Home Page</h1>;

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="has-text-danger " data-cy="peopleLoadingError">
        Failed to load people.
      </p>
    );
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <div>
      <h1 className="title">People Page</h1>
      <table
        className="table is-striped is-hoverable is-narrow is-fullwidth"
        data-cy="peopleTable"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <tr key={person.slug} data-cy="person">
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{person.motherName ? person.motherName : '-'}</td>
              <td>{person.fatherName ? person.fatherName : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PersonPage = () => {
  const { slug } = useParams();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getPeople()
      .then(people => {
        const foundPerson = people.find(p => p.slug === slug) || null;

        setPerson(foundPerson);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="has-text-danger">Failed to load person.</p>;
  }

  if (!person) {
    return <p className="has-text-danger">Person not found.</p>;
  }

  return (
    <div>
      <h1 className="title">{person.name}</h1>
      <p>Born: {person.born}</p>
      <p>Died: {person.died}</p>
      <p>Mother: {person.motherName ? person.motherName : '-'}</p>
      <p>Father: {person.fatherName ? person.fatherName : '-'}</p>
    </div>
  );
};

const NotFoundPage = () => <h1 className="title">Page not found</h1>;

export const App = () => {
  return (
    <>
      <div data-cy="app">
        <nav className="navbar  has-shadow" data-cy="nav">
          <div className="container">
            <div className="navbar-brand">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/people"
                className={({ isActive }) =>
                  `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
                }
              >
                People
              </NavLink>
            </div>
          </div>
        </nav>

        <main className="section">
          <div className="container">
            <Routes>
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/people" element={<PeoplePage />} />
              <Route path="/people/:slug" element={<PersonPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};
