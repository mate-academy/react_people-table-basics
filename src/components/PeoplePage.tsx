import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [hasErrorMessage, setHasErrorMessage] = useState(false);

  useEffect(() => {
    async function fetchPeople() {
      try {
        const personGet = await getPeople();

        setPeople(personGet);
      } catch (error) {
        setHasErrorMessage(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPeople();
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {loading ? (
          <Loader />
        ) : (
          <>
            {hasErrorMessage && (
              <p
                data-cy="peopleLoadingError"
                className="has-text-danger"
              >
                Something went wrong
              </p>
            )}

            {people.length === 0 && !hasErrorMessage && !loading && (
              <p
                data-cy="noPeopleMessage"
              >
                There are no people on the server
              </p>
            )}

            <PeopleTable people={people} />
          </>
        )}
      </div>
    </div>
  );
};
