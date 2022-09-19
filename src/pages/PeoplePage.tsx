import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setLoading(true);

        const result = await getPeople();

        setPeople(result);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && !people?.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
