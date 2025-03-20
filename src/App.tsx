import { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
  useParams,
} from 'react-router-dom';
import { Loader } from './components/Loader';
import { getPeople } from './api';
import { Person } from './types/Person';
import './App.scss';

const HomePage = () => (
  <div className="container">
    <h1 className="title">Home Page</h1>
  </div>
);

const NotFoundPage = () => (
  <div className="container">
    <h1 className="title">Page not found</h1>
  </div>
);

interface PersonLinkProps {
  name: string | null;
  people: Person[];
}

const PersonLink: React.FC<PersonLinkProps> = ({ name, people }) => {
  if (!name) {
    return <span>-</span>;
  }

  const person = people.find(p => p.name === name);

  if (!person) {
    return <span>{name}</span>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};

interface PeopleTableProps {
  people: Person[];
  selectedSlug?: string;
}

const PeopleTable: React.FC<PeopleTableProps> = ({ people, selectedSlug }) => (
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
      {people.map(person => (
        <tr
          key={person.slug}
          data-cy="person"
          className={
            person.slug === selectedSlug ? 'has-background-warning' : ''
          }
        >
          <td>
            <PersonLink name={person.name} people={people} />
          </td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>
            <PersonLink name={person.motherName} people={people} />
          </td>
          <td>
            <PersonLink name={person.fatherName} people={people} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const PeoplePage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);
        setError(null);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}
          {!isLoading && !error && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {!isLoading && !error && people.length > 0 && (
            <PeopleTable people={people} selectedSlug={slug} />
          )}
        </div>
      </div>
    </div>
  );
};

export const App = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link
              to="/"
              className={`navbar-item ${currentPath === '/' ? 'has-background-grey-lighter' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/people"
              className={`navbar-item ${currentPath.startsWith('/people') ? 'has-background-grey-lighter' : ''}`}
            >
              People
            </Link>
          </div>
        </div>
      </nav>

      <main className="section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};
