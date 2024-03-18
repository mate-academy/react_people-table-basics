import { useEffect, useState } from 'react';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {isError && !loading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !loading && !isError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && !!people.length && !isError && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
