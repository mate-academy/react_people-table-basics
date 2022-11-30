import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTabel } from '../components/PeopleTable/PeopleTable';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [hasErrorEmpty, setHasErrorEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadPeopleFromServer = async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      if (peopleFromServer.length === 0) {
        setHasErrorEmpty(true);
      }

      setPeople(peopleFromServer);
    } catch (error) {
      setHasLoadingError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {hasErrorEmpty && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && <PeopleTabel people={people} />}
        </div>
      </div>
    </>
  );
};
