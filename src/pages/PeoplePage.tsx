import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable.tsx/PeopleTable';
import { Loader } from '../components/Loader';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadError, setIsLoadError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsLoadError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <PeopleTable people={people} />
          )}

          {isLoadError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !people.length && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            </p>
          )}
        </div>
      </div>
    </>
  );
};
