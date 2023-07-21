import { FC, useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: FC = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNoPeople, setIsNoPeople] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(people => {
        if (!people.length) {
          setIsNoPeople(true);
        }

        setPeopleFromServer(people);
      })
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      {!isError && !isNoPeople && (
        <PeopleTable people={peopleFromServer} isLoading={isLoading} />
      )}

      {isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {isNoPeople && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}
    </div>
  );
};
