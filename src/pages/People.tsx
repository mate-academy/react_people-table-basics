import { useEffect, useState } from 'react';
import { Loader, PeopleList } from '../components';

import { Person } from '../types';
import { error, TABLE_HEADING } from '../constants';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error.DEFAULT}
            </p>
          )}

          {!isLoading && !people.length && (
            <p data-cy="noPeopleMessage">{error.NO_PEOPLE}</p>
          )}

          {!isLoading && !hasError && !!people.length && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {TABLE_HEADING.map(column => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>

              <PeopleList people={people} />
            </table>
          )}
        </div>
      </div>
    </>
  );
};
