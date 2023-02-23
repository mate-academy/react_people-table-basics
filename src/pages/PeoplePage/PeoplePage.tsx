import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';

import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { getPeopleWithParents } from '../../helpers/getPeopleWithParents';

import { Person } from '../../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        const peopleWithParents = getPeopleWithParents(peopleFromServer);

        setPeople(peopleWithParents);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsWaiting(false));
  }, []);

  const isDownloaded = !isWaiting && !hasError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isWaiting && <Loader />}

          {hasError && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {isDownloaded && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isDownloaded && people.length > 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
