import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasErrorInLoading, setHasErrorInLoading] = useState(false);
  const [hasErrorEmpty, setHasErrorEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadPeople = async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      if (peopleFromServer.length === 0) {
        setHasErrorEmpty(true);
      }

      setPeople(peopleFromServer);
    } catch {
      setHasErrorInLoading(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasErrorInLoading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {hasErrorEmpty && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people && people.length > 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
