import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';

import { Person } from '../../types';
import { getPeopleWithParents } from '../../api';

export const PeoplePage: React.FC = React.memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsInitialized(true);

    getPeopleWithParents()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isLoadSuccess = !isLoading && !hasError && isInitialized;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && hasError && (
            <p
              data-cy="peopleLoadingError"
              className={classNames(
                'has-text-danger',
                'has-text-centered',
                'has-text-weight-bold',
              )}
            >
              Something went wrong
            </p>
          )}

          {isLoadSuccess && !people.length && (
            <p
              data-cy="noPeopleMessage"
              className="has-text-centered has-text-weight-bold"
            >
              There are no people on the server
            </p>
          )}

          {isLoadSuccess && people.length > 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
});
