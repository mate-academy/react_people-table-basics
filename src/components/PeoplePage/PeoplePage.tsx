import React, { useState, useEffect, useCallback } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { ErrorMessage } from '../../types/ErrorMessage';
import { PeopleTable } from '../PeopleTable';
import { Loader } from '../Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(ErrorMessage.None);
  const [isLoading, setIsLoading] = useState(false);

  const getPeopleFromServer = useCallback(async () => {
    setError(ErrorMessage.None);
    setIsLoading(true);

    try {
      setPeople(await getPeople());
    } catch {
      setError(ErrorMessage.Wrong);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        <h1 className="title">People Page</h1>

        {isLoading && <Loader />}

        {people.length > 0 && (
          <PeopleTable people={people} />
        )}
        {(people.length === 0 && !isLoading) && (
          <p data-cy="noPeopleMessage">
            {ErrorMessage.Empty}
          </p>
        )}
        {(error === ErrorMessage.Wrong) && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {ErrorMessage.Wrong}
          </p>
        )}
      </div>
    </div>
  );
};
