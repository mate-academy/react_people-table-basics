import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonLink } from '../components/PersonLink';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { slug } = useParams();
  const selectedPersonSlug = slug || '';

  const byName = useMemo(
    () => new Map(people.map(person => [person.name, person])),
    [people],
  );
  const renderParent = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const person = byName.get(name);

    return person ? <PersonLink person={person} /> : name;
  };

  useEffect(() => {
    setErrorMessage('');
    setLoading(true);

    (async () => {
      try {
        const data = await getPeople();

        setPeople(data);
      } catch {
        setErrorMessage('Something went wrong');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {!loading && errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}
          {!loading && !errorMessage && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {!loading && !errorMessage && people.length > 0 && (
            <PeopleTable
              people={people}
              selectedPersonSlug={selectedPersonSlug}
              renderParent={renderParent}
            />
          )}
        </div>
      </div>
    </div>
  );
};
