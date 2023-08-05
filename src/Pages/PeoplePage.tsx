import { useState, useEffect } from 'react';
import { getPeople } from '../api/api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { getPeopleWithParent } from '../utils/getPeopleWithParent';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setProcessing(true);
    setError(false);

    getPeople()
      .then((fetchedPeople) => {
        setPeople(getPeopleWithParent(fetchedPeople));
      })
      .catch(() => setError(true))
      .finally(() => setProcessing(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {processing && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!processing && !people.length && !error && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!processing && people.length && !error && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
