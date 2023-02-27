import React, { useCallback, useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { preparePeople } from '../utils/preparePeople';

export const PersonPage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const fetchPeople = useCallback(async () => {
    try {
      setLoading(true);

      const people = await getPeople();

      const preparedPeople = preparePeople(people);

      setPeople(preparedPeople);
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPeople();
  }, []);

  const isEmplyPeople = !Boolean(people.length) && !isLoading && !isError;
  const isVisiblePeople = Boolean(people.length) && !isLoading;

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {isLoading && <Loader />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {isEmplyPeople && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {isVisiblePeople && (
          <PeopleTable people={people} />
        )}
      </div>
    </div>
  );
};
