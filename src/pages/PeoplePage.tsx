import React, { useEffect, useState } from 'react';

import { Loader } from '../components/Loader';
import { PeopleList } from '../components/PeopleList/PeopleList';

import { getPeople } from '../api';

import { Person } from '../types/Person';

import { getPersonParents } from '../helpers';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadPeopleFromServer = async () => {
    try {
      const peopleFromServer = await getPeople();
      const peopleWithParents: Person[] = peopleFromServer.map(
        person => getPersonParents(person, peopleFromServer),
      );

      setPeople(peopleWithParents);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeopleFromServer();
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {(!isLoading && hasError) && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(!isLoading && !hasError && people.length === 0) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {(!isLoading && !hasError && people.length > 0) && (
            <PeopleList people={people} />
          )}

        </div>
      </div>
    </div>
  );
};
