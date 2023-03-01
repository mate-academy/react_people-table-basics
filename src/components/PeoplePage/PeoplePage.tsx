import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { preparePeople } from '../../preperedPeople';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = React.memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoaderActive, setIsLoaderActive] = useState(true);
  const [isLoadingError, setIsLoadingError] = useState(false);

  const fetchPeople = async () => {
    try {
      let data = await getPeople();

      data = preparePeople(data);
      setPeople(data);
      setIsLoaderActive(false);
    } catch {
      setIsLoadingError(true);
    } finally {
      setIsLoaderActive(false);
    }
  };

  const peopleArrayIsEmpty = people.length === 0 && !isLoaderActive;

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoaderActive && <Loader />}

      {isLoadingError && (
        <p
          data-cy="peopleLoadingError"
          className="has-text-danger"
        >
          Something went wrong
        </p>
      )}

      {!!people.length && (
        <PeopleTable
          people={people}
        />
      )}

      {peopleArrayIsEmpty && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}
    </>
  );
});
