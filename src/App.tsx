// App.tsx
import { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  NavLink,
  useParams,
} from 'react-router-dom';

import { getPeople } from './api';
import { Person } from './types/Person';
import { Loader } from './components/Loader';

import './App.scss';

// ----- Navbar -----
const Navbar = () => (
  <nav
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
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
);

// ----- Pages -----
const HomePage = () => <h1 className="title">Home Page</h1>;
const NotFoundPage = () => <h1 className="title">Page not found</h1>;

// ----- PersonLink -----
interface PersonLinkProps {
  person?: Person;
  people?: Person[];
}

const PersonLink = ({ person, people }: PersonLinkProps) => {
  if (!person) {
    return <span>-</span>;
  }

  const found = people?.find(p => p.name === person.name);

  if (!found) {
    return <span>{person.name}</span>;
  }

  const className = person.sex === 'f' ? 'has-text-danger' : '';

  return (
    <NavLink className={className} to={`/people/${person.slug}`}>
      {person.name}
    </NavLink>
  );
};

// ----- PeopleTable -----
interface PeopleTableProps {
  people: Person[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
}

const PeopleTable = ({ people, selectedSlug, onSelect }: PeopleTableProps) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
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
      {people.map(person => {
        const isSelected = person.slug === selectedSlug;

        return (
          <tr
            key={person.slug}
            data-cy="person"
            className={isSelected ? 'has-background-warning' : ''}
            onClick={() => onSelect(person.slug)}
          >
            <td>
              <PersonLink person={person} people={people} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink person={person.mother} people={people} />
            </td>
            <td>
              <PersonLink person={person.father} people={people} />
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

// ----- PeoplePage -----
const PeoplePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState<string | null>(slug || null);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {!loading && !error && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {!loading && !error && people.length > 0 && (
            <PeopleTable
              people={people}
              selectedSlug={selected}
              onSelect={setSelected}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// ----- App -----
export const App = () => (
  <Router>
    <div data-cy="app">
      <Navbar />
      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  </Router>
);
